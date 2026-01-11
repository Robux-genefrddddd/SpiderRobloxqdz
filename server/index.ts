import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { handleDemo } from "./routes/demo";
import { handleDownload } from "./routes/download";
import {
  handleNSFWCheck,
  handleNSFWStats,
  handleNSFWAuditLogs,
} from "./routes/nsfw-check";

// Configure multer for in-memory file uploads
const memoryStorage = multer.memoryStorage();
const uploadMiddleware = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
  fileFilter: (_req, file, cb) => {
    // Only allow images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Download proxy endpoint - bypasses CORS issues
  // Usage: GET /api/download?filePath=assets/assetId/filename&fileName=display-name
  app.get("/api/download", handleDownload);

  // NSFW Detection Endpoints
  // POST /api/nsfw-check - Validate image for NSFW content before upload
  app.post("/api/nsfw-check", uploadMiddleware.single("file"), handleNSFWCheck);

  // GET /api/nsfw-check/stats - Get NSFW detection statistics (admin)
  app.get("/api/nsfw-check/stats", handleNSFWStats);

  // GET /api/nsfw-check/audit-logs - Get audit logs (admin)
  app.get("/api/nsfw-check/audit-logs", handleNSFWAuditLogs);

  return app;
}
