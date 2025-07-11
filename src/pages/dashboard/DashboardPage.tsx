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
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "@/components/pages/dashboard/metric-card";
import { SystemRevenueChart } from "@/components/charts/system-revenue-chart";
import { RestaurantPerformanceTable } from "@/components/table/restaurant-performance-table";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Manage orders from restaurants and grocery shops across
          your platform.
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
          title="Total Grocery Shops"
          value="186"
          description="+8 new this month"
          trend="up"
          trendValue="3.2%"
          icon={ShoppingCart}
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Restaurant Orders"
          value="3,245"
          description="+324 today"
          trend="up"
          trendValue="12.1%"
          icon={Package}
        />
        <MetricCard
          title="Grocery Orders"
          value="1,876"
          description="+198 today"
          trend="up"
          trendValue="8.7%"
          icon={Package}
        />
        <MetricCard
          title="Pending Orders"
          value="127"
          description="Awaiting pickup"
          trend="neutral"
          trendValue="2.3%"
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
              <CardTitle>Platform Revenue</CardTitle>
              <CardDescription>
                Monthly revenue from restaurants and grocery shops
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <SystemRevenueChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Vendors</CardTitle>
            <CardDescription>
              Based on monthly revenue (restaurants & groceries)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RestaurantPerformanceTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
