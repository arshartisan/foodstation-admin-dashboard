import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Route,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { DeliveryOrder } from "@/types";

// Mock data for in-transit orders
const mockInTransitOrders: DeliveryOrder[] = [
  {
    id: "ORD-005",
    customerId: "CUST-005",
    vendorId: "VEN-005",
    items: [
      {
        id: "ITEM-007",
        productId: "PROD-007",
        productName: "Chicken Tikka Masala",
        quantity: 1,
        price: 16.99,
      },
    ],
    status: "in-transit",
    totalAmount: 16.99,
    deliveryAddress: "555 Maple Ave, Northside, City 97531",
    estimatedDelivery: new Date("2025-07-11T14:15:00"),
    createdAt: new Date("2025-07-11T12:45:00"),
  },
  {
    id: "ORD-006",
    customerId: "CUST-006",
    vendorId: "VEN-006",
    items: [
      {
        id: "ITEM-008",
        productId: "PROD-008",
        productName: "BBQ Ribs",
        quantity: 1,
        price: 22.99,
      },
      {
        id: "ITEM-009",
        productId: "PROD-009",
        productName: "Coleslaw",
        quantity: 1,
        price: 3.99,
      },
    ],
    status: "in-transit",
    totalAmount: 26.98,
    deliveryAddress: "777 Cedar St, Southside, City 86420",
    estimatedDelivery: new Date("2025-07-11T14:45:00"),
    createdAt: new Date("2025-07-11T13:15:00"),
  },
];

export default function InTransitOrdersPage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockInTransitOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMarkDelivered = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "delivered" } : order
      )
    );
  };

  const handleReportIssue = (orderId: string) => {
    // Handle issue reporting
    console.log(`Reporting issue for order ${orderId}`);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getDeliveryStatus = (estimatedDelivery: Date) => {
    const now = new Date();
    const diff = estimatedDelivery.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes > 10) {
      return { text: "On Time", color: "text-green-600", icon: CheckCircle };
    } else if (minutes > 0) {
      return { text: "Urgent", color: "text-yellow-600", icon: AlertCircle };
    } else {
      return { text: "Overdue", color: "text-red-600", icon: AlertCircle };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg">Loading in-transit orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2 sm:p-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">In Transit</h1>
        <Badge variant="secondary" className="text-sm w-fit">
          {orders.length} orders in transit
        </Badge>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const deliveryStatus = getDeliveryStatus(order.estimatedDelivery);
          const StatusIcon = deliveryStatus.icon;

          return (
            <Card
              key={order.id}
              className="border-l-4 border-l-purple-500 shadow-sm"
            >
              <CardHeader className="pb-3 px-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Route className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    <CardTitle className="text-base sm:text-lg">
                      {order.id}
                    </CardTitle>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
                    <div
                      className={`flex items-center gap-1 text-xs sm:text-sm ${deliveryStatus.color}`}
                    >
                      <StatusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{deliveryStatus.text}</span>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      IN TRANSIT
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 px-3 sm:px-6">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="font-medium">Delivery Address:</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6 leading-relaxed">
                      {order.deliveryAddress}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="font-medium">Expected By:</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                      {formatTime(order.estimatedDelivery)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Order Items:</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-1"
                      >
                        <span className="text-sm">
                          {item.quantity}x {item.productName}
                        </span>
                        <span className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center font-medium">
                        <span>Total:</span>
                        <span>${order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    onClick={() => handleMarkDelivered(order.id)}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto"
                    size="sm"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Mark Delivered
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleReportIssue(order.id)}
                      className="flex items-center gap-2 flex-1 sm:flex-none"
                      size="sm"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <span className="hidden sm:inline">Report Issue</span>
                      <span className="sm:hidden">Issue</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 flex-1 sm:flex-none"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="hidden sm:inline">Call Customer</span>
                      <span className="sm:hidden">Call</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 flex-1 sm:flex-none"
                    >
                      <MapPin className="h-4 w-4" />
                      <span className="hidden sm:inline">Navigation</span>
                      <span className="sm:hidden">Nav</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <Route className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders in transit
          </h3>
          <p className="text-gray-500 text-sm px-4">
            You currently have no orders being delivered.
          </p>
        </div>
      )}
    </div>
  );
}
