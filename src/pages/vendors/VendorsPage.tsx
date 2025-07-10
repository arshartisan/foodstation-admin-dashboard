import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronDown,
  Filter,
  Plus,
  Search,
  Star,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VendorStatus from "@/components/pages/vendors/vendor-status";
import { CommonMetricCard } from "@/components/common-metric";
import { Vendor } from "@/types/vendor";
import { VendorDetailsModal } from "@/components/pages/vendors/vendor-details-modal";

const initialVendors: Vendor[] = [
  // Food Vendors
  {
    id: 1,
    name: "Gourmet Delights",
    owner: "John Smith",
    location: "New York, NY",
    category: "Fine Dining",
    type: "food",
    status: "active",
    rating: 4.8,
    orders: 1245,
    revenue: "$42,580",
    joinDate: "Jan 15, 2023",
    image: "https://placehold.co/400x400/orange/white",
  },
  {
    id: 2,
    name: "Pasta Paradise",
    owner: "Maria Garcia",
    location: "Chicago, IL",
    category: "Italian Restaurant",
    type: "food",
    status: "active",
    rating: 4.7,
    orders: 1120,
    revenue: "$38,290",
    joinDate: "Feb 3, 2023",
    image: "https://placehold.co/400x400/orange/white",
  },
  {
    id: 3,
    name: "Burger Bliss",
    owner: "Robert Johnson",
    location: "Los Angeles, CA",
    category: "Fast Food",
    type: "food",
    status: "active",
    rating: 4.6,
    orders: 1350,
    revenue: "$35,670",
    joinDate: "Mar 22, 2023",
    image: "https://placehold.co/400x400/orange/white",
  },
  {
    id: 4,
    name: "Grand Hotel Restaurant",
    owner: "Sarah Wilson",
    location: "Miami, FL",
    category: "Hotel Restaurant",
    type: "food",
    status: "active",
    rating: 4.9,
    orders: 980,
    revenue: "$32,450",
    joinDate: "Apr 10, 2023",
    image: "https://placehold.co/400x400/orange/white",
  },
  {
    id: 5,
    name: "Street Food Corner",
    owner: "Mike Chen",
    location: "Austin, TX",
    category: "Street Food",
    type: "food",
    status: "pending",
    rating: 0,
    orders: 0,
    revenue: "$0",
    joinDate: "Jun 18, 2023",
    image: "https://placehold.co/400x400/orange/white",
  },
  // Grocery Vendors
  {
    id: 6,
    name: "Fresh Market Co",
    owner: "Emily Davis",
    location: "Seattle, WA",
    category: "Organic Grocery",
    type: "grocery",
    status: "active",
    rating: 4.6,
    orders: 2340,
    revenue: "$68,920",
    joinDate: "Jan 8, 2023",
    image: "https://placehold.co/400x400/green/white",
  },
  {
    id: 7,
    name: "Neighborhood Grocery",
    owner: "David Brown",
    location: "Phoenix, AZ",
    category: "General Grocery",
    type: "grocery",
    status: "active",
    rating: 4.3,
    orders: 1890,
    revenue: "$45,670",
    joinDate: "Feb 20, 2023",
    image: "https://placehold.co/400x400/green/white",
  },
  {
    id: 8,
    name: "Healthy Harvest",
    owner: "Lisa Green",
    location: "Denver, CO",
    category: "Health Food Store",
    type: "grocery",
    status: "active",
    rating: 4.8,
    orders: 1560,
    revenue: "$52,340",
    joinDate: "Mar 15, 2023",
    image: "https://placehold.co/400x400/green/white",
  },
  {
    id: 9,
    name: "Bulk Bargains",
    owner: "Tom Anderson",
    location: "Portland, OR",
    category: "Wholesale Grocery",
    type: "grocery",
    status: "inactive",
    rating: 4.1,
    orders: 890,
    revenue: "$23,450",
    joinDate: "Apr 25, 2023",
    image: "https://placehold.co/400x400/green/white",
  },
  {
    id: 10,
    name: "Farm Fresh Produce",
    owner: "Jennifer Martinez",
    location: "San Diego, CA",
    category: "Produce Store",
    type: "grocery",
    status: "pending",
    rating: 0,
    orders: 0,
    revenue: "$0",
    joinDate: "Jun 30, 2023",
    image: "https://placehold.co/400x400/green/white",
  },
];

export default function VendorsPage() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateStatus = (
    id: number,
    newStatus: "active" | "pending" | "inactive"
  ) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === id ? { ...vendor, status: newStatus } : vendor
      )
    );

    toast({
      title: "Vendor status updated",
      description: `Vendor status has been updated to ${newStatus}`,
    });
  };

  const handleAddNewVendor = () => {
    navigate("/vendors/create");
  };

  const filteredVendors = vendors.filter((vendor) => {
    if (activeTab === "all") return true;
    if (activeTab === "food") return vendor.type === "food";
    if (activeTab === "grocery") return vendor.type === "grocery";
    if (activeTab === "active") return vendor.status === "active";
    if (activeTab === "pending") return vendor.status === "pending";
    if (activeTab === "inactive") return vendor.status === "inactive";
    return true;
  });

  const foodVendors = vendors.filter((v) => v.type === "food");
  const groceryVendors = vendors.filter((v) => v.type === "grocery");
  const activeVendors = vendors.filter((v) => v.status === "active");
  const pendingVendors = vendors.filter((v) => v.status === "pending");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row  justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground">
            Manage all vendors in the system.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="default"
            className="w-full sm:w-auto"
            onClick={handleAddNewVendor}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Vendor
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CommonMetricCard
          title={"Total Vendors"}
          value={vendors.length}
          description={`${activeVendors.length} active vendors`}
        />
        <CommonMetricCard
          title={"Food Vendors"}
          value={foodVendors.length}
          description={`Restaurants, hotels, cafes`}
        />
        <CommonMetricCard
          title={"Grocery Vendors"}
          value={groceryVendors.length}
          description={`Grocery stores, markets`}
        />
        <CommonMetricCard
          title={"Pending Approval"}
          value={pendingVendors.length}
          description={`Vendors waiting for approval`}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All Vendors</TabsTrigger>
              <TabsTrigger value="food">Food Vendors</TabsTrigger>
              <TabsTrigger value="grocery">Grocery Vendors</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[180px] lg:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search vendors..."
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
                <DropdownMenuLabel>Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Food Vendors
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Grocery Vendors
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Restaurant
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Hotel
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Grocery Store
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Organic Market
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Rating</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  4.5+
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  4.0+
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>3.5+</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="mr-2 h-4 w-4" />
              Date
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="">
            <CardTitle>All Vendors</CardTitle>
            <CardDescription>
              Showing {filteredVendors.length} vendors
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="hidden lg:table-cell">Orders</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Revenue
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden">
                          <img
                            src={vendor.image || "/placeholder.svg"}
                            alt={vendor.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{vendor.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {vendor.owner}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {vendor.location}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="capitalize">
                        {vendor.type === "food" ? "Food" : "Grocery"}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {vendor.category}
                    </TableCell>
                    <TableCell>
                      {vendor.status !== "pending" ? (
                        <div className="flex items-center">
                          {vendor.rating}
                          <Star className="h-3 w-3 ml-1 fill-amber-500 text-amber-500" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {vendor.status !== "pending" ? vendor.orders : "N/A"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {vendor.status !== "pending" ? vendor.revenue : "N/A"}
                    </TableCell>
                    <TableCell>
                      <VendorStatus status={vendor.status} />
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
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(vendor)}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/vendors/${vendor.id}/items`)
                            }
                          >
                            View items
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {vendor.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(vendor.id, "active")
                              }
                            >
                              Approve vendor
                            </DropdownMenuItem>
                          )}
                          {vendor.status === "active" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(vendor.id, "inactive")
                              }
                            >
                              Deactivate vendor
                            </DropdownMenuItem>
                          )}
                          {vendor.status === "inactive" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(vendor.id, "active")
                              }
                            >
                              Activate vendor
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Contact owner</DropdownMenuItem>
                          <DropdownMenuItem className="text-rose-500">
                            Remove vendor
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

      {selectedVendor && (
        <VendorDetailsModal
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
          vendor={selectedVendor}
          onStatusUpdate={(id, status) => handleUpdateStatus(id, status)}
        />
      )}
    </div>
  );
}
