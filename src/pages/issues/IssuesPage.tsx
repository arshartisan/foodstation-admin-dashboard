import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  MoreHorizontal,
  AlertTriangle,
  ChevronDown,
  Filter,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { CommonMetricCard } from "@/components/common-metric";
import { IssueDetailsModal } from "@/components/pages/issues/issue-details-modal";
import { Issue, IssueFilters } from "@/types";

const initialIssues: Issue[] = [
  {
    id: "ISS-001",
    title: "Delivery Driver Missing",
    description:
      "Order delivered but driver disappeared without completing delivery",
    reportedBy: "customer",
    reporterName: "Sarah Johnson",
    reporterId: "CUST-001",
    assignedTo: "John Smith",
    priority: "high",
    status: "in-progress",
    category: "delivery",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    dueDate: "2024-01-17T23:59:00Z",
    tags: ["delivery", "missing-driver"],
  },
  {
    id: "ISS-002",
    title: "Payment Processing Error",
    description: "Customer charged twice for the same order",
    reportedBy: "customer",
    reporterName: "Mike Chen",
    reporterId: "CUST-002",
    assignedTo: "Jane Doe",
    priority: "high",
    status: "open",
    category: "payment",
    createdAt: "2024-01-15T09:15:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
    dueDate: "2024-01-16T23:59:00Z",
    tags: ["payment", "duplicate-charge"],
  },
  {
    id: "ISS-003",
    title: "Vendor Account Suspended",
    description: "Unable to access vendor dashboard after system update",
    reportedBy: "vendor",
    reporterName: "Golden Dragon Restaurant",
    reporterId: "VEND-003",
    assignedTo: "Tom Wilson",
    priority: "medium",
    status: "resolved",
    category: "account",
    createdAt: "2024-01-14T16:45:00Z",
    updatedAt: "2024-01-15T11:30:00Z",
    dueDate: "2024-01-18T23:59:00Z",
    tags: ["account", "access"],
  },
  {
    id: "ISS-004",
    title: "Food Quality Complaint",
    description: "Customer received spoiled food items",
    reportedBy: "customer",
    reporterName: "Emma Davis",
    reporterId: "CUST-004",
    assignedTo: "Lisa Brown",
    priority: "high",
    status: "escalated",
    category: "food-quality",
    createdAt: "2024-01-15T12:00:00Z",
    updatedAt: "2024-01-15T15:45:00Z",
    dueDate: "2024-01-16T18:00:00Z",
    tags: ["food-quality", "health"],
  },
  {
    id: "ISS-005",
    title: "Commission Rate Dispute",
    description: "Vendor disputes the commission rate applied to recent orders",
    reportedBy: "vendor",
    reporterName: "Pizza Palace",
    reporterId: "VEND-005",
    assignedTo: "Mark Johnson",
    priority: "low",
    status: "open",
    category: "billing",
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
    dueDate: "2024-01-20T23:59:00Z",
    tags: ["billing", "commission"],
  },
];

const priorities = ["low", "medium", "high", "critical"] as const;
const statuses = [
  "open",
  "in-progress",
  "resolved",
  "closed",
  "escalated",
] as const;
const categories = [
  "delivery",
  "payment",
  "account",
  "food-quality",
  "billing",
  "technical",
  "other",
] as const;

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<IssueFilters>({
    priority: [],
    status: [],
    category: [],
    reportedBy: [],
  });
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "closed":
        return <XCircle className="h-4 w-4" />;
      case "escalated":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

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

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (selectedFilters.priority.length === 0 ||
        selectedFilters.priority.includes(issue.priority)) &&
      (selectedFilters.status.length === 0 ||
        selectedFilters.status.includes(issue.status)) &&
      (selectedFilters.category.length === 0 ||
        selectedFilters.category.includes(issue.category)) &&
      (selectedFilters.reportedBy.length === 0 ||
        selectedFilters.reportedBy.includes(issue.reportedBy));

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "open" &&
        ["open", "in-progress", "escalated"].includes(issue.status)) ||
      (activeTab === "resolved" &&
        ["resolved", "closed"].includes(issue.status)) ||
      (activeTab === "urgent" && ["high", "critical"].includes(issue.priority));

    return matchesSearch && matchesFilters && matchesTab;
  });

  const handleFilterChange = (
    filterType: keyof IssueFilters,
    value: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], value]
        : prev[filterType].filter((item) => item !== value),
    }));
  };

  const handleStatusChange = (issueId: string, newStatus: Issue["status"]) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId
          ? { ...issue, status: newStatus, updatedAt: new Date().toISOString() }
          : issue
      )
    );

    toast({
      title: "Status Updated",
      description: `Issue ${issueId} status changed to ${newStatus}`,
    });
  };

  const handleViewDetails = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsDetailsModalOpen(true);
  };

  const getMetrics = () => {
    const total = issues.length;
    const open = issues.filter((issue) =>
      ["open", "in-progress", "escalated"].includes(issue.status)
    ).length;
    const resolved = issues.filter((issue) =>
      ["resolved", "closed"].includes(issue.status)
    ).length;
    const urgent = issues.filter((issue) =>
      ["high", "critical"].includes(issue.priority)
    ).length;

    return { total, open, resolved, urgent };
  };

  const metrics = getMetrics();

  return (
    <div className="flex flex-col gap-6 pb-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Issues & Tickets</h1>
        <p className="text-muted-foreground">
          Manage and resolve customer and vendor issues efficiently
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CommonMetricCard
          title="Total Issues"
          value={metrics.total.toString()}
          description="All time"
        />
        <CommonMetricCard
          title="Open Issues"
          value={metrics.open.toString()}
          description="Requires attention"
        />
        <CommonMetricCard
          title="Resolved Issues"
          value={metrics.resolved.toString()}
          description="Successfully closed"
        />
        <CommonMetricCard
          title="Urgent Issues"
          value={metrics.urgent.toString()}
          description="High & critical priority"
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Issues Management</CardTitle>
              <CardDescription>
                View and manage all customer and vendor issues
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All Issues</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
                <TabsTrigger value="urgent">Urgent</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Priority Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Priority
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {priorities.map((priority) => (
                  <DropdownMenuCheckboxItem
                    key={priority}
                    checked={selectedFilters.priority.includes(priority)}
                    onCheckedChange={(checked) =>
                      handleFilterChange("priority", priority, checked)
                    }
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Status
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedFilters.status.includes(status)}
                    onCheckedChange={(checked) =>
                      handleFilterChange("status", status, checked)
                    }
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Category
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedFilters.category.includes(category)}
                    onCheckedChange={(checked) =>
                      handleFilterChange("category", category, checked)
                    }
                  >
                    {category.charAt(0).toUpperCase() +
                      category.slice(1).replace("-", " ")}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Issues Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.id}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <div className="font-medium truncate">
                          {issue.title}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {issue.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{issue.reporterName}</div>
                        <div className="text-sm text-muted-foreground">
                          {issue.reportedBy.charAt(0).toUpperCase() +
                            issue.reportedBy.slice(1)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(issue.priority)}>
                        {issue.priority.charAt(0).toUpperCase() +
                          issue.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(issue.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(issue.status)}
                          {issue.status.charAt(0).toUpperCase() +
                            issue.status.slice(1).replace("-", " ")}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="capitalize">
                        {issue.category.replace("-", " ")}
                      </div>
                    </TableCell>
                    <TableCell>{issue.assignedTo}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(issue)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          {statuses.map((status) => (
                            <DropdownMenuItem
                              key={status}
                              onClick={() =>
                                handleStatusChange(
                                  issue.id,
                                  status as Issue["status"]
                                )
                              }
                              disabled={issue.status === status}
                            >
                              {getStatusIcon(status)}
                              <span className="ml-2">
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1).replace("-", " ")}
                              </span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredIssues.length === 0 && (
            <div className="text-center py-10">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                No issues found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Issue Details Modal */}
      {selectedIssue && (
        <IssueDetailsModal
          issue={selectedIssue}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
