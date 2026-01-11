import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add middleware to redirect Netlify Functions to Express routes during dev
      server.middlewares.use((req, res, next) => {
        // Redirect /.netlify/functions/* to /api/*
        if (req.url?.startsWith("/.netlify/functions/")) {
          const originalUrl = req.url;
          const apiPath = originalUrl.replace("/.netlify/functions/", "/api/");
          req.url = apiPath;
          console.log(`[DEV] Redirecting: ${originalUrl} → ${apiPath}`);
        }
        next();
      });

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
