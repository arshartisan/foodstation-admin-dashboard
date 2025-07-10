import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  ShoppingCart,
  Utensils,
} from "lucide-react";
import { VendorItem } from "@/types/vendor";

const mockFoodItems: VendorItem[] = [
  {
    id: 1,
    name: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon grilled to perfection with herbs and lemon",
    category: "Main Course",
    price: 24.99,
    stock: 50,
    status: "available",
    image: "https://placehold.co/300x200/orange/white",
    sku: "GS001",
    vendorId: 1,
  },
  {
    id: 2,
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce with classic Caesar dressing and croutons",
    category: "Salads",
    price: 12.99,
    stock: 0,
    status: "out_of_stock",
    image: "https://placehold.co/300x200/orange/white",
    sku: "CS002",
    vendorId: 1,
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    description: "Rich chocolate cake with molten center, served warm",
    category: "Desserts",
    price: 8.99,
    stock: 25,
    status: "available",
    image: "https://placehold.co/300x200/orange/white",
    sku: "CC003",
    vendorId: 1,
  },
  {
    id: 4,
    name: "Truffle Risotto",
    description: "Creamy arborio rice with black truffle and parmesan",
    category: "Main Course",
    price: 32.99,
    stock: 15,
    status: "available",
    image: "https://placehold.co/300x200/orange/white",
    sku: "TR004",
    vendorId: 1,
  },
  {
    id: 5,
    name: "Lobster Bisque",
    description: "Rich and creamy lobster soup with brandy",
    category: "Soups",
    price: 16.99,
    stock: 0,
    status: "discontinued",
    image: "https://placehold.co/300x200/orange/white",
    sku: "LB005",
    vendorId: 1,
  },
];

const mockGroceryItems: VendorItem[] = [
  {
    id: 6,
    name: "Organic Bananas",
    description: "Fresh organic bananas, sold per pound",
    category: "Fruits",
    price: 2.99,
    stock: 100,
    status: "available",
    image: "https://placehold.co/300x200/green/white",
    sku: "OB006",
    vendorId: 6,
  },
  {
    id: 7,
    name: "Artisan Whole Grain Bread",
    description: "Freshly baked whole grain bread loaf",
    category: "Bakery",
    price: 4.99,
    stock: 20,
    status: "available",
    image: "https://placehold.co/300x200/green/white",
    sku: "WGB007",
    vendorId: 6,
  },
  {
    id: 8,
    name: "Organic Whole Milk",
    description: "1 gallon of organic whole milk from grass-fed cows",
    category: "Dairy",
    price: 6.99,
    stock: 0,
    status: "out_of_stock",
    image: "https://placehold.co/300x200/green/white",
    sku: "OM008",
    vendorId: 6,
  },
  {
    id: 9,
    name: "Free-Range Eggs",
    description: "Dozen free-range eggs from local farms",
    category: "Dairy",
    price: 5.99,
    stock: 45,
    status: "available",
    image: "https://placehold.co/300x200/green/white",
    sku: "FRE009",
    vendorId: 6,
  },
  {
    id: 10,
    name: "Quinoa Salad Mix",
    description: "Pre-made quinoa salad with vegetables and dressing",
    category: "Deli",
    price: 8.99,
    stock: 0,
    status: "discontinued",
    image: "https://placehold.co/300x200/green/white",
    sku: "QS010",
    vendorId: 6,
  },
];

export default function VendorItemsPage() {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock vendor data - in real app, this would come from API
  const vendor = {
    id: parseInt(vendorId || "1"),
    name: vendorId === "1" ? "Gourmet Delights" : "Fresh Market Co",
    type: vendorId === "1" ? "food" : "grocery",
    owner: vendorId === "1" ? "John Smith" : "Emily Davis",
  };

  const [items, setItems] = useState<VendorItem[]>(
    vendor.type === "food" ? mockFoodItems : mockGroceryItems
  );

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "available")
      return matchesSearch && item.status === "available";
    if (activeTab === "out_of_stock")
      return matchesSearch && item.status === "out_of_stock";
    if (activeTab === "discontinued")
      return matchesSearch && item.status === "discontinued";

    return matchesSearch;
  });

  const handleStatusUpdate = (
    itemId: number,
    newStatus: "available" | "out_of_stock" | "discontinued"
  ) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );

    toast({
      title: "Item status updated",
      description: `Item status has been updated to ${newStatus.replace(
        "_",
        " "
      )}`,
    });
  };

  const handleDeleteItem = (itemId: number) => {
    setItems(items.filter((item) => item.id !== itemId));
    toast({
      title: "Item deleted",
      description: "The item has been removed from the vendor's inventory",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-500"
          >
            Available
          </Badge>
        );
      case "out_of_stock":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Out of Stock
          </Badge>
        );
      case "discontinued":
        return (
          <Badge variant="outline" className="border-slate-500 text-slate-500">
            Discontinued
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const availableItems = items.filter((item) => item.status === "available");
  const outOfStockItems = items.filter(
    (item) => item.status === "out_of_stock"
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/vendors")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Vendors
        </Button>
        <div className="flex items-center gap-3">
          {vendor.type === "food" ? (
            <Utensils className="h-8 w-8 text-orange-500" />
          ) : (
            <ShoppingCart className="h-8 w-8 text-green-500" />
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {vendor.name} - Items
            </h1>
            <p className="text-muted-foreground">
              Manage {vendor.type === "food" ? "menu items" : "products"} for{" "}
              {vendor.owner}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
            <p className="text-xs text-muted-foreground">
              {vendor.type === "food" ? "Menu items" : "Products"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {availableItems.length}
            </div>
            <p className="text-xs text-muted-foreground">Ready to order</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {outOfStockItems.length}
            </div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {(
                items.reduce((sum, item) => sum + item.price, 0) / items.length
              ).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Per item</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="out_of_stock">Out of Stock</TabsTrigger>
            <TabsTrigger value="discontinued">Discontinued</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8"
            />
          </div>
          <Button onClick={() => navigate(`/vendors/${vendorId}/items/create`)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Items Inventory</CardTitle>
          <CardDescription>
            Showing {filteredItems.length} of {items.length} items
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden lg:table-cell">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.category}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {item.sku}
                    </code>
                  </TableCell>
                  <TableCell className="font-medium">${item.price}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className={item.stock === 0 ? "text-red-600" : ""}>
                      {item.stock}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {item.status === "available" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(item.id, "out_of_stock")
                            }
                          >
                            Mark Out of Stock
                          </DropdownMenuItem>
                        )}
                        {item.status === "out_of_stock" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(item.id, "available")
                            }
                          >
                            Mark Available
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusUpdate(item.id, "discontinued")
                          }
                        >
                          Mark Discontinued
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Item
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
  );
}
