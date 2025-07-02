import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DeliveryOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Delivery Orders</h1>
          <p className="text-muted-foreground">
            Track and manage all delivery orders and shipments.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            View all delivery orders, track shipments, and manage logistics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Delivery orders list will be displayed here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
