import { useState } from "react";
import { Asset, updateAsset } from "@/lib/assetService";
import { uploadAssetFile } from "@/lib/fileService";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, Trash2, File } from "lucide-react";

interface UpdateFileDialogProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedAsset: Asset) => void;
}

interface FilePreview {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export function UpdateFileDialog({
  asset,
  isOpen,
  onClose,
  onSuccess,
}: UpdateFileDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [changeNotes, setChangeNotes] = useState("");

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews: FilePreview[] = newFiles.map((file) => ({
        id: Math.random().toString(36),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
      }));
      setFiles((prev) => [...prev, ...newPreviews]);
      // Reset input
      e.target.value = "";
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!asset) return;

    if (files.length === 0) {
      toast.error("Please select at least one file to upload");
      return;
    }

    setIsLoading(true);
    try {
      const uploadedPaths: string[] = [];

      // Upload each file
      for (const filePreview of files) {
        const filePath = await uploadAssetFile(asset.id, filePreview.file);
        uploadedPaths.push(filePath);
      }

      // Update asset with new files and change notes
      const updatedFilePaths = [...(asset.filePaths || []), ...uploadedPaths];

      await updateAsset(asset.id, {
        filePaths: updatedFilePaths,
        updatedAt: new Date(),
      });

      const updatedAsset: Asset = {
        ...asset,
        filePaths: updatedFilePaths,
      };

      toast.success(`${files.length} file(s) uploaded successfully`);
      onSuccess(updatedAsset);
      setFiles([]);
      setChangeNotes("");
      onClose();
    } catch (error) {
      console.error("Error updating files:", error);
      toast.error("Failed to upload files");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Files</DialogTitle>
          <DialogDescription>
            Upload new versions of your asset files. Previous versions are kept
            for reference.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Area */}
          <div>
            <label
              htmlFor="file-input"
              className="text-sm font-medium block mb-1.5"
            >
              Select Files
            </label>
            <input
              id="file-input"
              type="file"
              multiple
              onChange={handleFileInput}
              disabled={isLoading}
              className="hidden"
            />
            <label
              htmlFor="file-input"
              className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-border/50 rounded-lg cursor-pointer hover:border-border transition-colors"
            >
              <UploadIcon size={20} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload files
              </span>
              <span className="text-xs text-muted-foreground/60">
                or drag and drop
              </span>
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                {files.length} file(s) selected
              </p>
              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2.5 bg-card/50 border border-border/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <File
                        size={14}
                        className="text-muted-foreground flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground/60">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      disabled={isLoading}
                      className="p-1 hover:bg-card rounded transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={14} className="text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Change Notes (Optional) */}
          <div>
            <label className="text-sm font-medium block mb-1.5">
              Change Notes (Optional)
            </label>
            <textarea
              value={changeNotes}
              onChange={(e) => setChangeNotes(e.target.value)}
              placeholder="Describe what changed in this version..."
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all duration-200 resize-none"
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
            <Button
              type="submit"
              disabled={isLoading || files.length === 0}
              size="sm"
            >
              {isLoading ? "Uploading..." : "Upload Files"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
