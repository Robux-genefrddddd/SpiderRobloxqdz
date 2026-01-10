import { useEffect, useState } from "react";
import { AlertTriangle, Ban, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeToUserWarnings, Warning } from "@/lib/warningService";

export function WarningNotificationModal() {
  const { user, userProfile } = useAuth();
  const [warnings, setWarnings] = useState<Warning[]>([]);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!user || !userProfile) return;

    // Subscribe to real-time warning updates
    const unsubscribe = subscribeToUserWarnings(user.uid, (newWarnings) => {
      setWarnings(newWarnings);

      // Show notification if there are new warnings and we haven't shown it yet
      if (newWarnings.length > 0 && !hasShown) {
        setHasShown(true);
      }
    });

    return unsubscribe;
  }, [user, userProfile, hasShown]);

  // Show notification only for the most recent warning
  const latestWarning = warnings[0];

  if (!latestWarning || !hasShown) return null;

  const isBan = latestWarning.type === "ban";
  const isSuspension = latestWarning.type === "suspension";

  const handleDismiss = () => {
    setHasShown(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div
        className={`w-full max-w-md border-2 rounded-2xl p-6 space-y-4 ${
          isBan
            ? "bg-red-950/80 border-red-500"
            : isSuspension
              ? "bg-yellow-950/80 border-yellow-500"
              : "bg-blue-950/80 border-blue-500"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {isBan ? (
            <Ban size={32} className="text-red-400" />
          ) : (
            <AlertTriangle size={32} className="text-yellow-400" />
          )}
          <div>
            <h2 className="text-xl font-bold text-white capitalize">
              {latestWarning.type === "ban" ? "Account Banned" : "Warning"}
            </h2>
            <p className="text-xs opacity-75 text-white">
              Issued by {latestWarning.adminName}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-white mb-2">Reason:</p>
            <p className="text-sm text-white/90">{latestWarning.reason}</p>
          </div>

          {latestWarning.details && (
            <div>
              <p className="text-sm font-medium text-white mb-2">Details:</p>
              <p className="text-sm text-white/90">{latestWarning.details}</p>
            </div>
          )}

          {latestWarning.expiresAt && (
            <div className="flex items-center gap-2 text-sm text-white/80 p-3 bg-white/10 rounded-lg">
              <Clock size={16} />
              <span>
                {latestWarning.type === "suspension"
                  ? "This suspension expires on "
                  : "Issued on "}
                {new Date(latestWarning.expiresAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}

          {isBan && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-300">
                Your account has been permanently banned. You cannot access your account or
                create new accounts.
              </p>
            </div>
          )}
        </div>

        {/* Close Button */}
        <Button
          onClick={handleDismiss}
          className="w-full bg-white text-black hover:bg-white/90"
        >
          I Understand
        </Button>

        {/* Close Icon */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
