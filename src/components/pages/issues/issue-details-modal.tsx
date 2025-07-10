import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Calendar,
  Clock,
  User,
  MessageSquare,
  Tag,
  CheckCircle,
  XCircle,
  Building,
  Mail,
  Phone,
} from "lucide-react";
import { Issue } from "@/types";

interface IssueDetailsModalProps {
  issue: Issue;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (issueId: string, newStatus: Issue["status"]) => void;
}

const statusOptions = [
  { value: "open", label: "Open", icon: AlertTriangle },
  { value: "in-progress", label: "In Progress", icon: Clock },
  { value: "resolved", label: "Resolved", icon: CheckCircle },
  { value: "closed", label: "Closed", icon: XCircle },
  { value: "escalated", label: "Escalated", icon: AlertTriangle },
] as const;

export function IssueDetailsModal({
  issue,
  isOpen,
  onClose,
  onStatusChange,
}: IssueDetailsModalProps) {
  const [newComment, setNewComment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Issue["status"]>(
    issue.status
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "escalated":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleStatusUpdate = () => {
    if (selectedStatus !== issue.status) {
      onStatusChange(issue.id, selectedStatus);
      onClose();
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would send the comment to the backend
      console.log("Adding comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Issue Details - {issue.id}
          </DialogTitle>
          <DialogDescription>
            Manage and resolve this issue efficiently
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{issue.title}</CardTitle>
                <CardDescription className="text-base">
                  {issue.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {issue.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status Update */}
            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
                <CardDescription>
                  Change the status of this issue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="status">Status:</Label>
                  <Select
                    value={selectedStatus}
                    onValueChange={(value: Issue["status"]) =>
                      setSelectedStatus(value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedStatus !== issue.status && (
                    <Button onClick={handleStatusUpdate} size="sm">
                      Update Status
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>
                  Add internal notes and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="comment">Add Comment</Label>
                  <Textarea
                    id="comment"
                    placeholder="Add your comment or update..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Add Comment
                  </Button>
                </div>

                {/* Sample Comments */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">John Smith</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm">
                      Investigated the issue. Reached out to the delivery
                      partner for clarification.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">System</span>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm">
                      Issue automatically assigned to John Smith based on
                      category and workload.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Issue Details */}
            <Card>
              <CardHeader>
                <CardTitle>Issue Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Priority:</span>
                  <Badge className={getPriorityColor(issue.priority)}>
                    {issue.priority.charAt(0).toUpperCase() +
                      issue.priority.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge className={getStatusColor(issue.status)}>
                    {issue.status.charAt(0).toUpperCase() +
                      issue.status.slice(1).replace("-", " ")}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Category:</span>
                  <span className="text-sm capitalize">
                    {issue.category.replace("-", " ")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Created:</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3 w-3" />
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Updated:</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3" />
                    {new Date(issue.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                {issue.dueDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Due Date:</span>
                    <div className="flex items-center gap-1 text-sm">
                      <AlertTriangle className="h-3 w-3" />
                      {new Date(issue.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reporter Information */}
            <Card>
              <CardHeader>
                <CardTitle>Reporter Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  {issue.reportedBy === "customer" ? (
                    <User className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Building className="h-4 w-4 text-green-600" />
                  )}
                  <span className="font-medium">{issue.reporterName}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>Type:</span>
                    <Badge variant="outline">
                      {issue.reportedBy.charAt(0).toUpperCase() +
                        issue.reportedBy.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  ID: {issue.reporterId}
                </div>
                {/* Mock contact information */}
                <div className="pt-2 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3" />
                    {issue.reportedBy === "customer"
                      ? "customer@example.com"
                      : "vendor@example.com"}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3" />
                    +1 (555) 123-4567
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assignment */}
            <Card>
              <CardHeader>
                <CardTitle>Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">
                    {issue.assignedTo || "Unassigned"}
                  </span>
                </div>
                {issue.assignedTo && (
                  <div className="mt-2 text-sm text-gray-600">
                    Assigned on {new Date(issue.createdAt).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
