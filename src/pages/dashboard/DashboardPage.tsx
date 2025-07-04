import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import {
  Users,
  Store,
  Truck,
  DollarSign,
  ShoppingCart,
  Package,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "@/components/metric-card";
import { SystemRevenueChart } from "@/components/charts/system-revenue-chart";

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
    <div className="flex flex-col gap-6 pb-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">System Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your entire system.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Tabs defaultValue="day" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="day">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="year">This Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Restaurants"
          value="248"
          description="+12 new this month"
          trend="up"
          trendValue="4.9%"
          icon={Store}
        />
        <MetricCard
          title="Active Customers"
          value="24,521"
          description="+2,145 this month"
          trend="up"
          trendValue="10.2%"
          icon={Users}
        />
        <MetricCard
          title="Active Drivers"
          value="842"
          description="-14 this month"
          trend="down"
          trendValue="1.6%"
          icon={Truck}
        />
        <MetricCard
          title="Total Revenue"
          value="$1.2M"
          description="+$124K this month"
          trend="up"
          trendValue="8.3%"
          icon={DollarSign}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>System Revenue</CardTitle>
              <CardDescription>
                Monthly revenue across all restaurants
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <SystemRevenueChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Restaurants</CardTitle>
            <CardDescription>Based on monthly revenue</CardDescription>
          </CardHeader>
          <CardContent>{/* <RestaurantPerformanceTable /> */}</CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest actions across the platform
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>{/* <RecentActivitiesTable /> */}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Statistics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Order Completion Rate</div>
                <div className="text-sm font-medium">94.2%</div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "94.2%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Average Delivery Time</div>
                <div className="text-sm font-medium">28 mins</div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Customer Satisfaction</div>
                <div className="text-sm font-medium">4.8/5</div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "96%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Restaurant Retention</div>
                <div className="text-sm font-medium">92.5%</div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "92.5%" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
