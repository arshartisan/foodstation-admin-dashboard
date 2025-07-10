import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CreateNotificationData } from "@/types";

interface CreateNotificationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateNotification: (notification: CreateNotificationData) => void;
}

export const CreateNotificationModal = ({
  isOpen,
  onOpenChange,
  onCreateNotification,
}: CreateNotificationModalProps) => {
  const [newNotification, setNewNotification] =
    useState<CreateNotificationData>({
      recipient_type: "all",
      type: "info",
      title: "",
      message: "",
    });

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) return;

    onCreateNotification(newNotification);
    setNewNotification({
      recipient_type: "all",
      type: "info",
      title: "",
      message: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Notification
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Notification</DialogTitle>
          <DialogDescription>
            Send a notification to users, customers, or vendors.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="recipient-type">Recipient Type</Label>
            <Select
              value={newNotification.recipient_type}
              onValueChange={(value: any) =>
                setNewNotification({
                  ...newNotification,
                  recipient_type: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="user">Staff Only</SelectItem>
                <SelectItem value="customer">Customers Only</SelectItem>
                <SelectItem value="vendor">Vendors Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Notification Type</Label>
            <Select
              value={newNotification.type}
              onValueChange={(value: any) =>
                setNewNotification({ ...newNotification, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newNotification.title}
              onChange={(e) =>
                setNewNotification({
                  ...newNotification,
                  title: e.target.value,
                })
              }
              placeholder="Enter notification title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={newNotification.message}
              onChange={(e) =>
                setNewNotification({
                  ...newNotification,
                  message: e.target.value,
                })
              }
              placeholder="Enter notification message"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleCreateNotification}
            disabled={!newNotification.title || !newNotification.message}
          >
            Send Notification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
