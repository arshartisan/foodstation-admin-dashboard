import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Store,
  Truck,
  DollarSign,
  ShoppingCart,
  Package,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    name: "Total Orders",
    value: "1,234",
    change: "+12%",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    name: "Active Customers",
    value: "856",
    change: "+8%",
    changeType: "positive",
    icon: Users,
  },
  {
    name: "Revenue",
    value: "$45,231",
    change: "+15%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    name: "Pending Deliveries",
    value: "23",
    change: "-5%",
    changeType: "negative",
    icon: Truck,
  },
];

const recentOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    status: "Delivered",
    amount: "$125.00",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    status: "In Transit",
    amount: "$89.50",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    status: "Processing",
    amount: "$234.75",
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    status: "Pending",
    amount: "$67.20",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your delivery system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest delivery orders from your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "In Transit"
                          ? "secondary"
                          : order.status === "Processing"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Package className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm">Total Products: 2,456</span>
              </div>
              <div className="flex items-center">
                <Store className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">Active Vendors: 89</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-sm">Staff Members: 12</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                <span className="text-sm">Pending Issues: 3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
