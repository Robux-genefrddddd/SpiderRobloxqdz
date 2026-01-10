import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, Crown, Shield, Users, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { logoutUser, DEFAULT_PROFILE_IMAGE } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function RoleBadge({ role }: { role?: string }) {
  if (!role || role === "member") return null;

  if (role === "founder") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-1 hover:scale-110 transition-transform cursor-help">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F6efe5c975de742218614020f75c6e644%2Fb430cdb925bf47f09a9d7c95a02f3bd0?format=webp&width=800"
              alt="Founder"
              className="w-4 h-4"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Founder
        </TooltipContent>
      </Tooltip>
    );
  }

  if (role === "admin") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-1 hover:scale-110 transition-transform cursor-help">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F6efe5c975de742218614020f75c6e644%2Fb5f004c16bc84ddd977be6eea56f8f20?format=webp&width=800"
              alt="Admin"
              className="w-4 h-4"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Admin
        </TooltipContent>
      </Tooltip>
    );
  }

  if (role === "partner") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <img
            src="https://cdn3.emoji.gg/emojis/42747-roblox-verified.png"
            alt="Partner"
            className="w-4 h-4 hover:scale-110 transition-transform cursor-help"
          />
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Partner
        </TooltipContent>
      </Tooltip>
    );
  }

  return null;
}

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, userProfile, loading, unreadCount } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Menu Button (Left) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 hover:bg-secondary/50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo (Center) */}
          <Link to="/" className="flex-shrink-0 absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Roblox_Logo.svg/2048px-Roblox_Logo.svg.png"
                alt="Roblox"
                className="h-5 object-contain"
              />
              <span className="font-bold text-xs tracking-tight text-foreground">
                RbxAssets
              </span>
            </div>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* User Profile Badge (Desktop) */}
            {isAuthenticated && userProfile && (
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 px-2 py-1.5 bg-secondary/40 border border-border/40 rounded-lg hover:bg-secondary/60 transition-all cursor-pointer group text-xs">
                      <img
                        src={
                          userProfile.profileImage ||
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                            userProfile.username
                        }
                        alt={userProfile.username}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {userProfile.username}
                      </span>
                      <RoleBadge role={userProfile.role} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-4 py-2 border-b border-border/20">
                      <p className="text-sm font-semibold text-foreground">
                        {userProfile.displayName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {userProfile.email}
                      </p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/upload" className="cursor-pointer">
                        Upload Asset
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/groups" className="cursor-pointer">
                        <Users size={16} className="mr-2" />
                        Groups
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/messages"
                        className="cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <Mail size={16} className="mr-2" />
                          Messages
                        </div>
                        {unreadCount > 0 && (
                          <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </span>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    {(userProfile.role === "founder" ||
                      userProfile.role === "admin") && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            to="/admin"
                            className="cursor-pointer text-amber-400"
                          >
                            <Shield size={16} className="mr-2" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-400 focus:bg-red-500/20"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Auth Buttons (Desktop) */}
            {!isAuthenticated && (
              <div className="hidden sm:flex items-center gap-1.5">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="text-xs">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/20 bg-secondary/20 fixed left-0 top-14 bottom-0 w-64 overflow-y-auto z-40 shadow-lg">
            {/* Top - Logo Section */}
            <div className="px-4 py-3 border-b border-border/20">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Roblox_Logo.svg/2048px-Roblox_Logo.svg.png"
                  alt="Roblox"
                  className="h-5 object-contain"
                />
                <span className="font-bold text-sm tracking-tight text-foreground">
                  RbxAssets
                </span>
              </Link>
            </div>

            {/* Scrollable Menu Items */}
            <div className="flex-1 overflow-y-auto space-y-1 py-3">
              {/* Main Links */}
              <Link
                to="/marketplace"
                className="block px-4 py-2 hover:bg-secondary/40 transition-colors font-medium text-sm text-foreground"
              >
                Marketplace
              </Link>
              <Link
                to="/support"
                className="block px-4 py-2 hover:bg-secondary/40 transition-colors font-medium text-sm text-foreground"
              >
                Support
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 hover:bg-secondary/40 transition-colors font-medium text-sm text-foreground"
              >
                About
              </Link>

              {isAuthenticated && userProfile ? (
                <>
                  <div className="px-4 py-2 border-t border-border/20 mt-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          userProfile.profileImage ||
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                            userProfile.username
                        }
                        alt={userProfile.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {userProfile.username}
                          </p>
                          <RoleBadge role={userProfile.role} />
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {userProfile.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-secondary/40 transition-colors font-medium text-sm text-foreground"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/upload"
                    className="block px-4 py-2 hover:bg-secondary/40 transition-colors font-medium text-sm text-foreground"
                  >
                    Upload Asset
                  </Link>
                  <Link
                    to="/groups"
                    className="block px-4 py-2 hover:bg-secondary/40 transition-colors font-medium text-sm text-foreground"
                  >
                    Groups
                  </Link>
                  <Link
                    to="/messages"
                    className="block px-4 py-2 hover:bg-secondary/40 transition-colors font-medium text-sm text-foreground flex items-center justify-between"
                  >
                    Messages
                    {unreadCount > 0 && (
                      <span className="bg-destructive text-destructive-foreground text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </Link>
                  {(userProfile.role === "founder" ||
                    userProfile.role === "admin") && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-secondary/40 transition-colors font-medium text-sm text-amber-400 border-t border-border/20 mt-2"
                    >
                      Admin Panel
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-secondary/40 transition-colors font-medium text-sm text-foreground"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:opacity-90 transition-all mx-4 text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Bottom - Roblox Logo & Logout */}
            <div className="border-t border-border/20 px-4 py-3 space-y-2">
              {isAuthenticated && userProfile && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 transition-colors font-medium text-sm rounded"
                >
                  Sign Out
                </button>
              )}
              <a
                href="https://roblox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity py-2"
              >
                <img
                  src="https://i.ibb.co/B531Dsh6/roblox-logo-roblox-symbol-meaning-history-and-evolution-3-removebg-preview.png"
                  alt="Roblox"
                  className="h-6 object-contain"
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
