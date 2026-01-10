import { Link } from "react-router-dom";
import { AssetCard } from "@/components/AssetCard";
import { Sparkles, Zap, Shield, TrendingUp } from "lucide-react";
import { Asset } from "@/lib/types";

// Mock featured assets for the homepage
const featuredAssets: Asset[] = [
  {
    id: "1",
    name: "Modern UI Kit",
    description: "A comprehensive UI kit for modern applications",
    type: "asset",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    productLink: "https://create.roblox.com/store/asset/1",
    price: null,
    category: "UI Design",
    authorId: "author1",
    authorName: "Design Pro",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    downloads: 2340,
    rating: 4.8,
    reviews: 127,
    createdAt: new Date(),
    updatedAt: new Date(),
    featured: true,
  },
  {
    id: "2",
    name: "3D Model Pack",
    description: "High-quality 3D models for your projects",
    type: "model",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324ef6cb?w=400&h=300&fit=crop",
    productLink: "https://create.roblox.com/store/asset/2",
    price: 29.99,
    category: "3D Models",
    authorId: "author2",
    authorName: "3D Master",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    downloads: 1560,
    rating: 4.9,
    reviews: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
    featured: true,
  },
  {
    id: "3",
    name: "JavaScript Utilities",
    description: "Essential JavaScript utilities and helpers",
    type: "script",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    productLink: "https://create.roblox.com/store/asset/3",
    price: null,
    category: "Code",
    authorId: "author3",
    authorName: "Dev Scripts",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
    downloads: 3120,
    rating: 4.7,
    reviews: 156,
    createdAt: new Date(),
    updatedAt: new Date(),
    featured: true,
  },
  {
    id: "4",
    name: "Animation Pack",
    description: "Smooth and professional animations",
    type: "asset",
    imageUrl: "https://images.unsplash.com/photo-1626921235308-f88c12b71d93?w=400&h=300&fit=crop",
    productLink: "https://create.roblox.com/store/asset/4",
    price: 19.99,
    category: "Animations",
    authorId: "author4",
    authorName: "Motion Design",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    downloads: 890,
    rating: 4.6,
    reviews: 72,
    createdAt: new Date(),
    updatedAt: new Date(),
    featured: true,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b border-border overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium">
                ✨ Welcome to AssetHub
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Your Marketplace for <span className="text-accent">Digital Assets</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover, download, and share thousands of premium digital assets. From 3D models to scripts, UI kits to animations – everything you need for your projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/marketplace"
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
              >
                <Sparkles size={20} />
                Explore Marketplace
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 rounded-lg bg-secondary text-foreground font-semibold border border-border hover:bg-muted transition-all inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="pt-12 grid grid-cols-3 gap-6 max-w-xl mx-auto">
              <div>
                <p className="text-2xl md:text-3xl font-bold">10K+</p>
                <p className="text-sm text-muted-foreground">Assets</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">50K+</p>
                <p className="text-sm text-muted-foreground">Users</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">98%</p>
                <p className="text-sm text-muted-foreground">Satisfied</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose AssetHub?</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to find, share, and monetize digital assets
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/20 text-accent flex items-center justify-center mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Carefully curated assets from talented creators, all verified for quality and compliance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/20 text-accent flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Access</h3>
              <p className="text-muted-foreground">
                Get instant access to assets immediately after purchase. No delays, no complications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/20 text-accent flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure & Trusted</h3>
              <p className="text-muted-foreground">
                Industry-leading security with verified creators and protected transactions for your peace of mind.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/20 text-accent flex items-center justify-center mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Earn Money</h3>
              <p className="text-muted-foreground">
                Become a partner and monetize your digital assets with our fair revenue-sharing model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Assets Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Assets</h2>
            <p className="text-lg text-muted-foreground">
              Discover trending assets from our community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/marketplace"
              className="px-8 py-3 rounded-lg bg-secondary text-foreground font-semibold border border-border hover:bg-muted transition-all inline-flex items-center justify-center gap-2"
            >
              View All Assets →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
