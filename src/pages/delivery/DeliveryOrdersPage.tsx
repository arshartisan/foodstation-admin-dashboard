import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Clock, Route, MapPin, Phone } from "lucide-react";
import { DeliveryOrder } from "@/types";

// Mock data for demonstration
const mockOrders: DeliveryOrder[] = [
  {
    id: "ORD-001",
    customerId: "CUST-001",
    vendorId: "VEN-001",
    items: [
      {
        id: "ITEM-001",
        productId: "PROD-001",
        productName: "Margherita Pizza",
        quantity: 2,
        price: 12.99,
      },
      {
        id: "ITEM-002",
        productId: "PROD-002",
        productName: "Garlic Bread",
        quantity: 1,
        price: 4.99,
      },
    ],
    status: "pending",
    totalAmount: 30.97,
    deliveryAddress: "123 Main St, Downtown, City 12345",
    estimatedDelivery: new Date("2025-07-11T14:30:00"),
    createdAt: new Date("2025-07-11T12:00:00"),
  },
  {
    id: "ORD-002",
    customerId: "CUST-002",
    vendorId: "VEN-002",
    items: [
      {
        id: "ITEM-003",
        productId: "PROD-003",
        productName: "Chicken Burger",
        quantity: 1,
        price: 8.99,
      },
    ],
    status: "in-transit",
    totalAmount: 8.99,
    deliveryAddress: "456 Oak Ave, Suburb, City 67890",
    estimatedDelivery: new Date("2025-07-11T13:45:00"),
    createdAt: new Date("2025-07-11T11:30:00"),
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  "in-transit": "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function DeliveryOrdersPage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (
    orderId: string,
    newStatus: DeliveryOrder["status"]
  ) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2 sm:p-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">My Orders</h1>
        <Badge variant="secondary" className="text-sm w-fit">
          {orders.length} orders assigned
        </Badge>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="border-l-4 border-l-blue-500 shadow-sm"
          >
            <CardHeader className="pb-3 px-3 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <CardTitle className="text-base sm:text-lg">
                    {order.id}
                  </CardTitle>
                </div>
                <Badge className={statusColors[order.status]}>
                  {order.status.replace("-", " ").toUpperCase()}
                </Badge>
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
                    <span className="font-medium">Estimated Delivery:</span>
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
                {order.status === "pending" && (
                  <Button
                    onClick={() => handleStatusUpdate(order.id, "in-transit")}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto"
                    size="sm"
                  >
                    <Route className="h-4 w-4" />
                    Start Delivery
                  </Button>
                )}
                {order.status === "in-transit" && (
                  <Button
                    onClick={() => handleStatusUpdate(order.id, "delivered")}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto"
                    size="sm"
                  >
                    <Package className="h-4 w-4" />
                    Mark Delivered
                  </Button>
                )}
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
                    <span className="hidden sm:inline">View Map</span>
                    <span className="sm:hidden">Map</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders assigned
          </h3>
          <p className="text-gray-500 text-sm px-4">
            You currently have no delivery orders assigned to you.
          </p>
        </div>
      )}
    </div>
  );
}
