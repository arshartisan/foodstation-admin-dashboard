import { useState, useEffect } from "react";
import { Bell, Filter, Search, MoreVertical, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Notification, CreateNotificationData } from "@/types";
import { CreateNotificationModal } from "@/components/notification/notification-create-modal";

// Mock data - replace with actual API calls
const mockNotifications: Notification[] = [
  {
    id: "1",
    recipient_type: "all",
    type: "info",
    title: "System Maintenance",
    message: "System will be under maintenance on Saturday from 2 AM to 6 AM.",
    is_read: false,
    createdAt: new Date("2024-12-20T10:30:00"),
  },
  {
    id: "2",
    recipient_type: "vendor",
    recipient_id: "vendor-123",
    type: "warning",
    title: "Payment Due",
    message: "Your payment for order #12345 is due in 2 days.",
    is_read: true,
    createdAt: new Date("2024-12-19T14:20:00"),
  },
  {
    id: "3",
    recipient_type: "customer",
    recipient_id: "customer-456",
    type: "success",
    title: "Order Delivered",
    message: "Your order #67890 has been successfully delivered.",
    is_read: false,
    createdAt: new Date("2024-12-18T16:45:00"),
  },
  {
    id: "4",
    recipient_type: "user",
    recipient_id: "user-789",
    type: "error",
    title: "Order Issue",
    message: "There was an issue with order #11111. Please review immediately.",
    is_read: false,
    createdAt: new Date("2024-12-17T09:15:00"),
  },
];

export default function NotificationsPage() {
  useDocumentTitle();

  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filteredNotifications, setFilteredNotifications] =
    useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterRecipient, setFilterRecipient] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Filter notifications based on search and filters
  useEffect(() => {
    let filtered = notifications;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (notification) =>
          notification.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          notification.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter(
        (notification) => notification.type === filterType
      );
    }

    // Recipient filter
    if (filterRecipient !== "all") {
      filtered = filtered.filter(
        (notification) => notification.recipient_type === filterRecipient
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, searchQuery, filterType, filterRecipient]);

  const handleCreateNotification = (
    notificationData: CreateNotificationData
  ) => {
    const notification: Notification = {
      id: Date.now().toString(),
      ...notificationData,
      is_read: false,
      createdAt: new Date(),
    };

    setNotifications([notification, ...notifications]);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, is_read: true } : notif
      )
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "success":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRecipientBadge = (recipientType: string) => {
    switch (recipientType) {
      case "all":
        return <Badge variant="outline">All Users</Badge>;
      case "user":
        return <Badge variant="outline">Staff</Badge>;
      case "customer":
        return <Badge variant="outline">Customer</Badge>;
      case "vendor":
        return <Badge variant="outline">Vendor</Badge>;
      default:
        return <Badge variant="outline">{recipientType}</Badge>;
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="w-fit">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage and send notifications to users, customers, and vendors
          </p>
        </div>
        <div className="flex-shrink-0">
          <CreateNotificationModal
            isOpen={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            onCreateNotification={handleCreateNotification}
          />
        </div>
      </div>

      {/* Notifications Table */}
      <Card>
        <CardHeader className="">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="">
              <CardTitle className="text-lg md:text-xl">
                All Notifications
              </CardTitle>
              <CardDescription className="text-sm">
                {filteredNotifications.length} notification(s) found
              </CardDescription>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              {/* Filter dropdowns - stack on small screens, side by side on larger screens */}
              <div className="flex flex-row gap-0 space-y-2 sm:space-y-0 sm:gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="">
                      <Filter className="mr-2 h-4 w-4 flex-shrink-0" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select
                    value={filterRecipient}
                    onValueChange={setFilterRecipient}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Filter by recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Recipients</SelectItem>
                      <SelectItem value="user">Staff</SelectItem>
                      <SelectItem value="customer">Customers</SelectItem>
                      <SelectItem value="vendor">Vendors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Mobile card view for small screens, table for larger screens */}
          <div className="md:hidden">
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="p-4 space-y-3">
                  {/* Status and Type */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {notification.is_read ? (
                        <Badge variant="secondary" className="text-xs">
                          Read
                        </Badge>
                      ) : (
                        <Badge variant="default" className="text-xs">
                          Unread
                        </Badge>
                      )}
                      <Badge
                        className={`text-xs ${getTypeColor(notification.type)}`}
                      >
                        {notification.type.charAt(0).toUpperCase() +
                          notification.type.slice(1)}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {!notification.is_read && (
                          <DropdownMenuItem
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Mark as Read
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() =>
                            handleDeleteNotification(notification.id)
                          }
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Title and Message */}
                  <div className="space-y-1">
                    <div className="font-medium text-sm">
                      {notification.title}
                    </div>
                    <div className="text-xs text-muted-foreground overflow-hidden">
                      <div
                        className="line-clamp-2"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {notification.message}
                      </div>
                    </div>
                  </div>

                  {/* Recipient and Date */}
                  <div className="flex items-center justify-between text-xs">
                    <div>{getRecipientBadge(notification.recipient_type)}</div>
                    <div className="text-muted-foreground">
                      {notification.createdAt.toLocaleDateString()} at{" "}
                      {notification.createdAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {filteredNotifications.length === 0 && (
                <div className="text-center py-8 px-4">
                  <div className="text-muted-foreground">
                    <Bell className="mx-auto h-12 w-12 opacity-20 mb-4" />
                    <p className="text-sm">No notifications found</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop table view */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Status</TableHead>
                  <TableHead className="w-20">Type</TableHead>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead className="w-32">Recipient</TableHead>
                  <TableHead className="w-40">Created</TableHead>
                  <TableHead className="w-20 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      {notification.is_read ? (
                        <Badge variant="secondary" className="text-xs">
                          Read
                        </Badge>
                      ) : (
                        <Badge variant="default" className="text-xs">
                          Unread
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs ${getTypeColor(notification.type)}`}
                      >
                        {notification.type.charAt(0).toUpperCase() +
                          notification.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px]">
                        <div className="font-medium text-sm truncate">
                          {notification.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {notification.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRecipientBadge(notification.recipient_type)}
                    </TableCell>
                    <TableCell className="text-xs">
                      <div>{notification.createdAt.toLocaleDateString()}</div>
                      <div className="text-muted-foreground">
                        {notification.createdAt.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {!notification.is_read && (
                            <DropdownMenuItem
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Mark as Read
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() =>
                              handleDeleteNotification(notification.id)
                            }
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredNotifications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-muted-foreground">
                        <Bell className="mx-auto h-12 w-12 opacity-20 mb-4" />
                        <p className="text-sm">No notifications found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
