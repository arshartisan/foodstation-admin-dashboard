import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  Search,
  Calendar,
  Package,
  MapPin,
  Star,
} from "lucide-react";
import { DeliveryOrder } from "@/types";

// Mock data for delivered orders
const mockDeliveredOrders: DeliveryOrder[] = [
  {
    id: "ORD-007",
    customerId: "CUST-007",
    vendorId: "VEN-007",
    items: [
      {
        id: "ITEM-010",
        productId: "PROD-010",
        productName: "Pad Thai",
        quantity: 1,
        price: 13.99,
      },
    ],
    status: "delivered",
    totalAmount: 13.99,
    deliveryAddress: "888 Birch St, Downtown, City 11111",
    estimatedDelivery: new Date("2025-07-11T12:30:00"),
    createdAt: new Date("2025-07-11T11:00:00"),
  },
  {
    id: "ORD-008",
    customerId: "CUST-008",
    vendorId: "VEN-008",
    items: [
      {
        id: "ITEM-011",
        productId: "PROD-011",
        productName: "Beef Tacos",
        quantity: 3,
        price: 4.99,
      },
      {
        id: "ITEM-012",
        productId: "PROD-012",
        productName: "Guacamole",
        quantity: 1,
        price: 2.99,
      },
    ],
    status: "delivered",
    totalAmount: 17.96,
    deliveryAddress: "999 Willow St, Eastside, City 22222",
    estimatedDelivery: new Date("2025-07-11T11:45:00"),
    createdAt: new Date("2025-07-11T10:15:00"),
  },
  {
    id: "ORD-009",
    customerId: "CUST-009",
    vendorId: "VEN-009",
    items: [
      {
        id: "ITEM-013",
        productId: "PROD-013",
        productName: "Greek Salad",
        quantity: 1,
        price: 11.99,
      },
    ],
    status: "delivered",
    totalAmount: 11.99,
    deliveryAddress: "111 Spruce St, Westside, City 33333",
    estimatedDelivery: new Date("2025-07-10T18:30:00"),
    createdAt: new Date("2025-07-10T17:00:00"),
  },
];

export default function DeliveredOrdersPage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<DeliveryOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockDeliveredOrders);
      setFilteredOrders(mockDeliveredOrders);
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

  const getDeliveryTime = (createdAt: Date, estimatedDelivery: Date) => {
    const diff = estimatedDelivery.getTime() - createdAt.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} min`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg">Loading delivered orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2 sm:p-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Delivered Orders</h1>
        <Badge variant="secondary" className="text-sm w-fit">
          {orders.length} orders completed
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
            className="border-l-4 border-l-green-500 shadow-sm"
          >
            <CardHeader className="pb-3 px-3 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <CardTitle className="text-base sm:text-lg">
                    {order.id}
                  </CardTitle>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 text-xs"
                  >
                    {getDeliveryTime(order.createdAt, order.estimatedDelivery)}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    DELIVERED
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
                    <span className="font-medium">Delivered:</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    {formatDate(order.estimatedDelivery)} at{" "}
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

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">
                    Delivery completed successfully
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
          <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? "No matching orders found" : "No delivered orders"}
          </h3>
          <p className="text-gray-500 text-sm px-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Your delivered orders will appear here once you complete deliveries."}
          </p>
        </div>
      )}
    </div>
  );
}
