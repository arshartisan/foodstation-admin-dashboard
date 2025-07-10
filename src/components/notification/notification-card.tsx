import { formatDistanceToNow } from "date-fns";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Notification } from "@/types";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  compact?: boolean;
}

export function NotificationCard({
  notification,
  onMarkAsRead,
  onDismiss,
  compact = false,
}: NotificationCardProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case "success":
        return "border-l-green-500";
      case "warning":
        return "border-l-yellow-500";
      case "error":
        return "border-l-red-500";
      default:
        return "border-l-blue-500";
    }
  };

  return (
    <Card
      className={`border-l-4 ${getTypeColor()} ${
        !notification.is_read ? "bg-blue-50/50" : ""
      } transition-all hover:shadow-md`}
    >
      <CardContent className={`${compact ? "p-3" : "p-4"}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h4 className={`font-medium ${compact ? "text-sm" : ""}`}>
                {notification.title}
              </h4>
              <div className="flex items-center gap-2">
                {!notification.is_read && (
                  <Badge variant="default" className="text-xs">
                    New
                  </Badge>
                )}
                {onDismiss && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDismiss(notification.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
            <p
              className={`text-muted-foreground ${
                compact ? "text-xs" : "text-sm"
              }`}
            >
              {notification.message}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {notification.recipient_type === "all"
                    ? "All Users"
                    : notification.recipient_type.charAt(0).toUpperCase() +
                      notification.recipient_type.slice(1)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(notification.createdAt, {
                    addSuffix: true,
                  })}
                </span>
              </div>
              {!notification.is_read && onMarkAsRead && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs"
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
