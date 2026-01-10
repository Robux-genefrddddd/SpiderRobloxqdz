import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="space-y-3">
            <h1 className="text-6xl md:text-7xl font-bold text-accent">404</h1>
            <h2 className="text-3xl font-bold">Page Not Found</h2>
            <p className="text-lg text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              to="/"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <Link
              to="/marketplace"
              className="px-8 py-3 rounded-lg bg-secondary border border-border text-foreground font-semibold hover:bg-muted transition-all inline-flex items-center justify-center gap-2"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
