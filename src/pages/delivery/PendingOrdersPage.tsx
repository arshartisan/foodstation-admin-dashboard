import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Clock, MapPin, Phone } from "lucide-react";
import { DeliveryOrder } from "@/types";

// Mock data for pending orders
const mockPendingOrders: DeliveryOrder[] = [
  {
    id: "ORD-003",
    customerId: "CUST-003",
    vendorId: "VEN-003",
    items: [
      {
        id: "ITEM-004",
        productId: "PROD-004",
        productName: "Spaghetti Carbonara",
        quantity: 1,
        price: 15.99,
      },
      {
        id: "ITEM-005",
        productId: "PROD-005",
        productName: "Caesar Salad",
        quantity: 1,
        price: 8.99,
      },
    ],
    status: "pending",
    totalAmount: 24.98,
    deliveryAddress: "789 Pine St, Eastside, City 13579",
    estimatedDelivery: new Date("2025-07-11T15:00:00"),
    createdAt: new Date("2025-07-11T12:30:00"),
  },
  {
    id: "ORD-004",
    customerId: "CUST-004",
    vendorId: "VEN-004",
    items: [
      {
        id: "ITEM-006",
        productId: "PROD-006",
        productName: "Fish and Chips",
        quantity: 2,
        price: 12.5,
      },
    ],
    status: "pending",
    totalAmount: 25.0,
    deliveryAddress: "321 Elm St, Westside, City 24680",
    estimatedDelivery: new Date("2025-07-11T15:30:00"),
    createdAt: new Date("2025-07-11T13:00:00"),
  },
];

export default function PendingOrdersPage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockPendingOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAcceptOrder = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "processing" } : order
      )
    );
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getTimeUntilDelivery = (estimatedDelivery: Date) => {
    const now = new Date();
    const diff = estimatedDelivery.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    return minutes > 0 ? `${minutes} minutes` : "Overdue";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg">Loading pending orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2 sm:p-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Pending Orders</h1>
        <Badge variant="secondary" className="text-sm w-fit">
          {orders.length} orders waiting
        </Badge>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="border-l-4 border-l-orange-500 shadow-sm"
          >
            <CardHeader className="pb-3 px-3 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  <CardTitle className="text-base sm:text-lg">
                    {order.id}
                  </CardTitle>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 text-xs"
                  >
                    {getTimeUntilDelivery(order.estimatedDelivery)}
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                    PENDING
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
                    <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
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
                  onClick={() => handleAcceptOrder(order.id)}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto"
                  size="sm"
                >
                  <Package className="h-4 w-4" />
                  Accept Order
                </Button>
                <div className="flex gap-2">
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
                    <span className="hidden sm:inline">View Route</span>
                    <span className="sm:hidden">Route</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No pending orders
          </h3>
          <p className="text-gray-500 text-sm px-4">
            All orders have been processed. Check back later for new orders.
          </p>
        </div>
      )}
    </div>
  );
}
