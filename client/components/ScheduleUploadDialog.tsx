import { useState } from "react";
import { Asset } from "@/lib/assetService";
import { createScheduledUpload } from "@/lib/scheduledUploadService";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, Trash2, File, Clock } from "lucide-react";

interface ScheduleUploadDialogProps {
  asset: Asset | null;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FilePreview {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export function ScheduleUploadDialog({
  asset,
  userId,
  isOpen,
  onClose,
  onSuccess,
}: ScheduleUploadDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [changeNotes, setChangeNotes] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("12:00");
  const [useImmediate, setUseImmediate] = useState(false);

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

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    return now.toISOString().slice(0, 16);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!asset) return;

    if (files.length === 0) {
      toast.error("Please select at least one file to upload");
      return;
    }

    // Validate schedule date
    let scheduledDateTime: Date;
    if (useImmediate) {
      scheduledDateTime = new Date();
      scheduledDateTime.setMinutes(scheduledDateTime.getMinutes() + 1);
    } else {
      if (!scheduleDate || !scheduleTime) {
        toast.error("Please select a date and time");
        return;
      }

      scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      const now = new Date();

      if (scheduledDateTime <= now) {
        toast.error("Schedule time must be in the future");
        return;
      }
    }

    setIsLoading(true);
    try {
      await createScheduledUpload(
        asset.id,
        userId,
        files.map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
        changeNotes,
        scheduledDateTime,
      );

      const timeStr = useImmediate
        ? "soon"
        : scheduledDateTime.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

      toast.success(`Upload scheduled for ${timeStr}`);
      onSuccess();
      setFiles([]);
      setChangeNotes("");
      setScheduleDate("");
      setScheduleTime("12:00");
      setUseImmediate(false);
      onClose();
    } catch (error) {
      console.error("Error scheduling upload:", error);
      toast.error("Failed to schedule upload");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock size={18} />
            Schedule Upload
          </DialogTitle>
          <DialogDescription>
            Schedule when your files will be uploaded to the marketplace.
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
              <div className="space-y-2 max-h-32 overflow-y-auto">
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

          {/* Change Notes */}
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

          {/* Schedule Options */}
          <div className="space-y-3 p-3 bg-card/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="immediate"
                checked={useImmediate}
                onChange={(e) => setUseImmediate(e.target.checked)}
                className="rounded"
              />
              <label
                htmlFor="immediate"
                className="text-sm font-medium cursor-pointer"
              >
                Upload immediately
              </label>
            </div>

            {!useImmediate && (
              <div className="space-y-2 ml-6">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="input-base w-full"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">
                    Schedule Time
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="input-base w-full"
                  />
                </div>

                {scheduleDate && scheduleTime && (
                  <p className="text-xs text-muted-foreground/70 p-2 bg-background rounded border border-border/30">
                    📅 Upload scheduled for:{" "}
                    {new Date(`${scheduleDate}T${scheduleTime}`).toLocaleString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                )}
              </div>
            )}
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
              {isLoading ? "Scheduling..." : "Schedule Upload"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
