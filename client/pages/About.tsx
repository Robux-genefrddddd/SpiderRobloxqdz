import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">About AssetHub</h1>
            <p className="text-base text-muted-foreground max-w-2xl">
              A trusted digital asset marketplace for creators, developers, and studios.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                AssetHub is a marketplace built by creators, for creators. We believe high-quality digital assets should be accessible to everyone.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our commitment: quality curation, fair pricing, and zero compromises on security.
              </p>
            </div>
            <div className="rounded-sm overflow-hidden border border-border/50">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-accent/20 text-accent flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-semibold text-sm">Quality</h3>
              <p className="text-xs text-muted-foreground">
                Every asset is reviewed for quality, compatibility, and compliance.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-accent/20 text-accent flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-semibold text-sm">Creator-First</h3>
              <p className="text-xs text-muted-foreground">
                Fair compensation and tools that empower creators.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-accent/20 text-accent flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-semibold text-sm">Security</h3>
              <p className="text-xs text-muted-foreground">
                Enterprise-grade security for all transactions and data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center space-y-3">
                <div className="w-24 h-24 mx-auto rounded-sm overflow-hidden border border-border/50">
                  <img
                    src={`https://images.unsplash.com/photo-${1494790108377 + i}?w=200&h=200&fit=crop`}
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Member {i}</h3>
                  <p className="text-xs text-muted-foreground">Creator</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Started</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join creators and developers using AssetHub to find and share digital assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/marketplace"
              className="px-6 py-2 rounded-sm bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
            >
              Browse Assets
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 rounded-sm bg-secondary border border-border/50 text-foreground font-medium text-sm hover:bg-secondary/80 transition-all inline-flex items-center justify-center gap-2"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
