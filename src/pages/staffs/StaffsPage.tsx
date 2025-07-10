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
  Truck,
  MapPin,
  UserCheck,
  UserX,
  Bike,
  Car,
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
    email: "john.anderson@delivery.com",
    phone: "+1 (555) 123-4567",
    role: "Regional Manager",
    department: "North Region",
    status: "active",
    hireDate: "Jan 15, 2022",
    lastLogin: "2 hours ago",
    permissions: [
      "region_management",
      "delivery_oversight",
      "staff_management",
    ],
    salary: "$65,000",
    deliveryZone: "North District",
    vehicleType: "Company Car",
    deliveriesCompleted: 0,
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@delivery.com",
    phone: "+1 (555) 234-5678",
    role: "Regional Manager",
    department: "South Region",
    status: "active",
    hireDate: "Mar 3, 2022",
    lastLogin: "1 day ago",
    permissions: [
      "region_management",
      "delivery_oversight",
      "performance_reports",
    ],
    salary: "$63,000",
    deliveryZone: "South District",
    vehicleType: "Company Car",
    deliveriesCompleted: 0,
  },
  {
    id: 3,
    name: "Alex Chen",
    email: "alex.chen@delivery.com",
    phone: "+1 (555) 345-6789",
    role: "Delivery Person",
    department: "North Region",
    status: "active",
    hireDate: "May 22, 2022",
    lastLogin: "3 hours ago",
    permissions: ["delivery_execution", "order_updates"],
    salary: "$42,000",
    deliveryZone: "Zone A1",
    vehicleType: "Motorcycle",
    deliveriesCompleted: 1247,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@delivery.com",
    phone: "+1 (555) 456-7890",
    role: "Delivery Person",
    department: "South Region",
    status: "active",
    hireDate: "Jul 10, 2022",
    lastLogin: "5 hours ago",
    permissions: ["delivery_execution", "order_updates"],
    salary: "$44,000",
    deliveryZone: "Zone B2",
    vehicleType: "Van",
    deliveriesCompleted: 1089,
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@delivery.com",
    phone: "+1 (555) 567-8901",
    role: "Delivery Person",
    department: "East Region",
    status: "inactive",
    hireDate: "Sep 5, 2022",
    lastLogin: "2 weeks ago",
    permissions: ["delivery_execution"],
    salary: "$40,000",
    deliveryZone: "Zone C1",
    vehicleType: "Bicycle",
    deliveriesCompleted: 892,
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@delivery.com",
    phone: "+1 (555) 678-9012",
    role: "Delivery Person",
    department: "North Region",
    status: "active",
    hireDate: "Nov 18, 2022",
    lastLogin: "1 hour ago",
    permissions: ["delivery_execution", "order_updates"],
    salary: "$41,000",
    deliveryZone: "Zone A2",
    vehicleType: "Motorcycle",
    deliveriesCompleted: 923,
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.taylor@delivery.com",
    phone: "+1 (555) 789-0123",
    role: "Regional Manager",
    department: "East Region",
    status: "active",
    hireDate: "Dec 7, 2022",
    lastLogin: "4 hours ago",
    permissions: [
      "region_management",
      "delivery_oversight",
      "team_coordination",
    ],
    salary: "$62,000",
    deliveryZone: "East District",
    vehicleType: "Company Car",
    deliveriesCompleted: 0,
  },
  {
    id: 8,
    name: "Lisa Martinez",
    email: "lisa.martinez@delivery.com",
    phone: "+1 (555) 890-1234",
    role: "Delivery Person",
    department: "South Region",
    status: "active",
    hireDate: "Feb 12, 2023",
    lastLogin: "6 hours ago",
    permissions: ["delivery_execution", "customer_service"],
    salary: "$43,000",
    deliveryZone: "Zone B1",
    vehicleType: "Van",
    deliveriesCompleted: 756,
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
    case "regional manager":
      return "default";
    case "delivery person":
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
      title: "Team member status updated",
      description: `Team member status has been updated to ${newStatus}`,
    });
  };

  const filteredStaffs = staffs.filter((staff) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "active") return staff.status === "active";
    if (selectedTab === "inactive") return staff.status === "inactive";
    if (selectedTab === "managers")
      return staff.role.toLowerCase() === "regional manager";
    if (selectedTab === "delivery")
      return staff.role.toLowerCase() === "delivery person";
    return true;
  });

  const activeStaffs = staffs.filter((s) => s.status === "active").length;
  const inactiveStaffs = staffs.filter((s) => s.status === "inactive").length;
  const managerCount = staffs.filter(
    (s) => s.role.toLowerCase() === "regional manager"
  ).length;
  const deliveryPersonCount = staffs.filter(
    (s) => s.role.toLowerCase() === "delivery person"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Delivery Team Management
          </h1>
          <p className="text-muted-foreground">
            Manage delivery personnel, regional managers, and delivery
            operations.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CommonMetricCard
          title={"Total Team Members"}
          value={staffs.length}
          description={`${activeStaffs} active, ${inactiveStaffs} inactive`}
        />
        <CommonMetricCard
          title={"Regional Managers"}
          value={managerCount}
          description={"Managing delivery regions"}
        />
        <CommonMetricCard
          title={"Delivery Personnel"}
          value={deliveryPersonCount}
          description={"Active delivery team"}
        />
        <CommonMetricCard
          title={"Total Deliveries"}
          value={staffs.reduce(
            (total, staff) => total + (staff.deliveriesCompleted || 0),
            0
          )}
          description={"Completed this month"}
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
              <TabsTrigger value="all">All Team</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="managers">Managers</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[180px] lg:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search team members..."
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
                <DropdownMenuLabel>Region</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  North Region
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  South Region
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  East Region
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  West Region
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Vehicle Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Motorcycle
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Van</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Bicycle
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Company Car
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
            <CardTitle>Delivery Team Directory</CardTitle>
            <CardDescription>
              Showing {filteredStaffs.length} team members
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Member</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Region/Zone
                  </TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Vehicle
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Deliveries
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Active
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
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">
                            {staff.department}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {staff.deliveryZone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(staff.role)}>
                        {staff.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        {staff.vehicleType === "Motorcycle" && (
                          <Bike className="h-4 w-4 text-blue-600" />
                        )}
                        {staff.vehicleType === "Van" && (
                          <Truck className="h-4 w-4 text-green-600" />
                        )}
                        {staff.vehicleType === "Company Car" && (
                          <Car className="h-4 w-4 text-purple-600" />
                        )}
                        {staff.vehicleType === "Bicycle" && (
                          <Bike className="h-4 w-4 text-orange-600" />
                        )}
                        <span className="text-sm">{staff.vehicleType}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="text-sm font-medium">
                        {staff.deliveriesCompleted || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        completed
                      </div>
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
                          <DropdownMenuItem>
                            View delivery history
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {staff.status === "active" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(staff.id, "inactive")
                              }
                            >
                              Deactivate member
                            </DropdownMenuItem>
                          )}
                          {staff.status === "inactive" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(staff.id, "active")
                              }
                            >
                              Activate member
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            Assign delivery zone
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Update vehicle info
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove from team
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
