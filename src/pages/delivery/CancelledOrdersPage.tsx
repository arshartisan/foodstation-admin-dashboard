import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  XCircle,
  Search,
  Calendar,
  Package,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { DeliveryOrder } from "@/types";

// Mock data for cancelled orders
const mockCancelledOrders: DeliveryOrder[] = [
  {
    id: "ORD-010",
    customerId: "CUST-010",
    vendorId: "VEN-010",
    items: [
      {
        id: "ITEM-014",
        productId: "PROD-014",
        productName: "Pepperoni Pizza",
        quantity: 1,
        price: 18.99,
      },
    ],
    status: "cancelled",
    totalAmount: 18.99,
    deliveryAddress: "222 Ash St, Suburb, City 44444",
    estimatedDelivery: new Date("2025-07-10T19:00:00"),
    createdAt: new Date("2025-07-10T17:30:00"),
  },
  {
    id: "ORD-011",
    customerId: "CUST-011",
    vendorId: "VEN-011",
    items: [
      {
        id: "ITEM-015",
        productId: "PROD-015",
        productName: "Chicken Wings",
        quantity: 2,
        price: 12.99,
      },
    ],
    status: "cancelled",
    totalAmount: 25.98,
    deliveryAddress: "333 Poplar Ave, Downtown, City 55555",
    estimatedDelivery: new Date("2025-07-11T12:00:00"),
    createdAt: new Date("2025-07-11T10:30:00"),
  },
];

const cancellationReasons = [
  "Customer requested cancellation",
  "Restaurant unavailable",
  "Address issues",
  "Weather conditions",
  "Vehicle breakdown",
  "Other",
];

export default function CancelledOrdersPage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<DeliveryOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockCancelledOrders);
      setFilteredOrders(mockCancelledOrders);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, orders]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getRandomCancellationReason = () => {
    return cancellationReasons[
      Math.floor(Math.random() * cancellationReasons.length)
    ];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg">Loading cancelled orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2 sm:p-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Cancelled Orders</h1>
        <Badge variant="secondary" className="text-sm w-fit">
          {orders.length} orders cancelled
        </Badge>
      </div>

      <div className="flex items-center gap-4 px-2 sm:px-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <Card
            key={order.id}
            className="border-l-4 border-l-red-500 shadow-sm"
          >
            <CardHeader className="pb-3 px-3 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <CardTitle className="text-base sm:text-lg">
                    {order.id}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    CANCELLED
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
                    <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="font-medium">Cancelled:</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    {formatDate(order.createdAt)} at{" "}
                    {formatTime(order.createdAt)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span className="font-medium">Cancellation Reason:</span>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  {getRandomCancellationReason()}
                </p>
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

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-600">
                    Order was cancelled
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">View Details</span>
                  <span className="sm:hidden">Details</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <XCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "No matching orders found" : "No cancelled orders"}
          </h3>
          <p className="text-gray-500 text-sm px-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "No orders have been cancelled recently."}
          </p>
        </div>
      )}
    </div>
  );
}
