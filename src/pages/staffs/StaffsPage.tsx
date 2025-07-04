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
  User,
  Calendar,
  ChevronDown,
  Filter,
  Plus,
  Shield,
  UserCheck,
  UserX,
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

const initialStaffs = [
  {
    id: 1,
    name: "John Anderson",
    email: "john.anderson@company.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    department: "Management",
    status: "active",
    hireDate: "Jan 15, 2022",
    lastLogin: "2 hours ago",
    permissions: ["full_access", "user_management", "system_config"],
    salary: "$85,000",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@company.com",
    phone: "+1 (555) 234-5678",
    role: "Manager",
    department: "Operations",
    status: "active",
    hireDate: "Mar 3, 2022",
    lastLogin: "1 day ago",
    permissions: ["order_management", "staff_view", "reports"],
    salary: "$65,000",
  },
  {
    id: 3,
    name: "Alex Chen",
    email: "alex.chen@company.com",
    phone: "+1 (555) 345-6789",
    role: "Staff",
    department: "Customer Service",
    status: "active",
    hireDate: "May 22, 2022",
    lastLogin: "3 hours ago",
    permissions: ["customer_support", "order_view"],
    salary: "$45,000",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 456-7890",
    role: "Manager",
    department: "Finance",
    status: "active",
    hireDate: "Jul 10, 2022",
    lastLogin: "5 hours ago",
    permissions: ["financial_reports", "payment_management"],
    salary: "$70,000",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@company.com",
    phone: "+1 (555) 567-8901",
    role: "Staff",
    department: "IT Support",
    status: "inactive",
    hireDate: "Sep 5, 2022",
    lastLogin: "2 weeks ago",
    permissions: ["technical_support"],
    salary: "$50,000",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1 (555) 678-9012",
    role: "Staff",
    department: "Customer Service",
    status: "active",
    hireDate: "Nov 18, 2022",
    lastLogin: "1 hour ago",
    permissions: ["customer_support", "order_view"],
    salary: "$45,000",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.taylor@company.com",
    phone: "+1 (555) 789-0123",
    role: "Manager",
    department: "Operations",
    status: "active",
    hireDate: "Dec 7, 2022",
    lastLogin: "4 hours ago",
    permissions: ["order_management", "vendor_management", "reports"],
    salary: "$68,000",
  },
  {
    id: 8,
    name: "Lisa Martinez",
    email: "lisa.martinez@company.com",
    phone: "+1 (555) 890-1234",
    role: "Staff",
    department: "Marketing",
    status: "active",
    hireDate: "Feb 12, 2023",
    lastLogin: "6 hours ago",
    permissions: ["content_management", "analytics_view"],
    salary: "$52,000",
  },
];

// const getRoleIcon = (role: string) => {
//   switch (role.toLowerCase()) {
//     case "admin":
//       return <Shield className="h-4 w-4 text-red-500" />;
//     case "manager":
//       return <UserCheck className="h-4 w-4 text-blue-500" />;
//     case "staff":
//       return <User className="h-4 w-4 text-green-500" />;
//     default:
//       return <User className="h-4 w-4 text-gray-500" />;
//   }
// };

const getRoleBadgeVariant = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "outline";
    case "manager":
      return "default";
    case "staff":
      return "secondary";
    default:
      return "outline";
  }
};

const getStatusBadgeVariant = (status: string) => {
  return status === "active" ? "default" : "secondary";
};

const getStatusBadgeColor = (status: string) => {
  return status === "active"
    ? "bg-green-100 text-green-800 hover:bg-green-100"
    : "bg-gray-100 text-gray-800 hover:bg-gray-100";
};

export default function StaffsPage() {
  const [staffs, setStaffs] = useState(initialStaffs);
  const [selectedTab, setSelectedTab] = useState("all");

  const handleUpdateStatus = (id: number, newStatus: string) => {
    setStaffs(
      staffs.map((staff) =>
        staff.id === id ? { ...staff, status: newStatus } : staff
      )
    );

    toast({
      title: "Staff status updated",
      description: `Staff status has been updated to ${newStatus}`,
    });
  };

  const filteredStaffs = staffs.filter((staff) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "active") return staff.status === "active";
    if (selectedTab === "inactive") return staff.status === "inactive";
    if (selectedTab === "admin") return staff.role.toLowerCase() === "admin";
    if (selectedTab === "manager")
      return staff.role.toLowerCase() === "manager";
    if (selectedTab === "staff") return staff.role.toLowerCase() === "staff";
    return true;
  });

  const activeStaffs = staffs.filter((s) => s.status === "active").length;
  const inactiveStaffs = staffs.filter((s) => s.status === "inactive").length;
  const adminCount = staffs.filter(
    (s) => s.role.toLowerCase() === "admin"
  ).length;
  const managerCount = staffs.filter(
    (s) => s.role.toLowerCase() === "manager"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Staff Management
          </h1>
          <p className="text-muted-foreground">
            Manage your team members, roles, and permissions.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CommonMetricCard
          title={"Total Staff"}
          value={staffs.length}
          description={`${activeStaffs} active, ${inactiveStaffs} inactive`}
        />
        <CommonMetricCard
          title={"Administrators"}
          value={adminCount}
          description={"System administrators"}
        />
        <CommonMetricCard
          title={"Managers"}
          value={managerCount}
          description={"Department managers"}
        />
        <CommonMetricCard
          title={"Staff Members"}
          value={staffs.filter((s) => s.role.toLowerCase() === "staff").length}
          description={"Regular staff members"}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All Staff</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="admin">Admins</TabsTrigger>
              <TabsTrigger value="manager">Managers</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[180px] lg:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search staff..."
                className="w-full pl-8 bg-background"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Department</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Management
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Operations
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Customer Service
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Finance
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  IT Support
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Marketing
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Hire Date</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Last 30 days
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Last 90 days
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Last year</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="mr-2 h-4 w-4" />
              Date
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Staff Directory</CardTitle>
            <CardDescription>
              Showing {filteredStaffs.length} staff members
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Member</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Department
                  </TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Hire Date
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Login
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaffs.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{staff.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {staff.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {staff.department}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* {getRoleIcon(staff.role)} */}
                        <Badge variant={getRoleBadgeVariant(staff.role)}>
                          {staff.role}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {staff.hireDate}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(staff.status)}
                        className={getStatusBadgeColor(staff.status)}
                      >
                        {staff.status === "active" ? (
                          <div className="flex items-center gap-1">
                            <UserCheck className="h-3 w-3" />
                            Active
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <UserX className="h-3 w-3" />
                            Inactive
                          </div>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {staff.lastLogin}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit profile</DropdownMenuItem>
                          <DropdownMenuItem>
                            Manage permissions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {staff.status === "active" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(staff.id, "inactive")
                              }
                            >
                              Deactivate staff
                            </DropdownMenuItem>
                          )}
                          {staff.status === "inactive" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(staff.id, "active")
                              }
                            >
                              Activate staff
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            View login history
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove staff
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
