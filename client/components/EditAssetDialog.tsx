import { useState } from "react";
import { Asset, updateAsset } from "@/lib/assetService";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface EditAssetDialogProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedAsset: Asset) => void;
}

const CATEGORIES = [
  "3D Models",
  "UI Design",
  "Scripts",
  "Animations",
  "Plugins",
  "Sounds",
  "Images",
  "Other",
];

export function EditAssetDialog({
  asset,
  isOpen,
  onClose,
  onSuccess,
}: EditAssetDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: asset?.name || "",
    description: asset?.description || "",
    category: asset?.category || "",
    price: (asset?.price || 0).toString(),
    tags: (asset?.tags || []).join(", "),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!asset) return;

    // Validation
    if (!formData.name.trim()) {
      toast.error("Asset name is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!formData.category) {
      toast.error("Category is required");
      return;
    }

    setIsLoading(true);
    try {
      const price = parseFloat(formData.price) || 0;
      const tags = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      await updateAsset(asset.id, {
        name: formData.name,
        description: formData.description,
        category: formData.category as Asset["category"],
        price,
        tags,
      });

      const updatedAsset: Asset = {
        ...asset,
        name: formData.name,
        description: formData.description,
        category: formData.category as Asset["category"],
        price,
        tags,
      };

      toast.success("Asset updated successfully");
      onSuccess(updatedAsset);
      onClose();
    } catch (error) {
      console.error("Error updating asset:", error);
      toast.error("Failed to update asset");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Asset</DialogTitle>
          <DialogDescription>
            Update your asset details. Changes are saved immediately.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Asset Name */}
          <div>
            <label className="text-sm font-medium block mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Asset name"
              className="input-base"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium block mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what this asset includes"
              rows={4}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all duration-200 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium block mb-1.5">Category</label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium block mb-1.5">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="input-base"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Set to 0 for free asset
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium block mb-1.5">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Separate tags with commas"
              className="input-base"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm rounded-lg border border-border/50 text-foreground hover:bg-card/50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <Button type="submit" disabled={isLoading} size="sm">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
