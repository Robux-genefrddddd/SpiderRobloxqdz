import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/20 bg-background/50 mt-20">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary-foreground text-xs">
                  a
                </span>
              </div>
              <span className="font-semibold text-sm">AssetHub</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Digital marketplace for creators, developers, and studios.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-3 text-foreground text-xs uppercase tracking-wide">
              Product
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="/marketplace"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3 text-foreground text-xs uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="/about"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3 text-foreground text-xs uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="/privacy"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/20 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-xs text-muted-foreground">
              © {currentYear} AssetHub. All rights reserved.
            </p>
            {/* Roblox Logo */}
            <a
              href="https://roblox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Roblox"
            >
              <img
                src="https://www.freepnglogos.com/uploads/roblox/roblox-logo-roblox-symbol-meaning-history-and-evolution-3.jpg"
                alt="Roblox"
                className="h-5 object-contain"
              />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/40 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/40 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:contact@assethub.com"
              className="p-2 rounded-lg hover:bg-secondary/40 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
