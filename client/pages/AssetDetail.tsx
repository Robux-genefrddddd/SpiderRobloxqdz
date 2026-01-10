import { useParams } from "react-router-dom";
import { Star, Download, Heart } from "lucide-react";

export default function AssetDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Image */}
          <div className="md:col-span-2">
            <div className="rounded-lg overflow-hidden bg-muted h-96">
              <img
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
                alt="Asset"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                Free
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">Modern UI Kit</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star size={16} className="fill-accent text-accent" />
                <span>4.8 (127 reviews)</span>
              </div>
            </div>

            <div className="border-t border-b border-border py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Downloads</span>
                <div className="flex items-center gap-2">
                  <Download size={18} />
                  <span className="font-semibold">2,340</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all">
                Download Asset
              </button>
              <button className="w-full py-3 rounded-lg bg-secondary border border-border font-semibold hover:bg-muted transition-all flex items-center justify-center gap-2">
                <Heart size={20} />
                Save Asset
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">About This Asset</h2>
            <p className="text-muted-foreground leading-relaxed">
              This is a comprehensive UI kit designed for modern web and mobile applications. It includes components, patterns, and design guidelines.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">What's Included</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• 200+ UI Components</li>
              <li>• Design System Documentation</li>
              <li>• Color Palette & Typography</li>
              <li>• Responsive Layouts</li>
              <li>• Accessibility Guidelines</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Creator</h3>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Design Pro</p>
                <p className="text-sm text-muted-foreground">UI/UX Designer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Assets - Placeholder */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">More from Creator</h2>
          <p className="text-muted-foreground">Related assets will be displayed here</p>
        </div>
      </div>
    </div>
  );
}
