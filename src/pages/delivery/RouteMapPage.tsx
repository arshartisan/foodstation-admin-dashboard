import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Route, Clock, Package } from "lucide-react";

interface DeliveryRoute {
  id: string;
  orderId: string;
  address: string;
  estimatedTime: string;
  distance: string;
  status: "pending" | "in-progress" | "completed";
  customerName: string;
  customerPhone: string;
}

const mockRoutes: DeliveryRoute[] = [
  {
    id: "1",
    orderId: "ORD-001",
    address: "123 Main St, Downtown, City 12345",
    estimatedTime: "15 min",
    distance: "2.3 km",
    status: "in-progress",
    customerName: "Alice Johnson",
    customerPhone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    orderId: "ORD-002",
    address: "456 Oak Ave, Suburb, City 67890",
    estimatedTime: "25 min",
    distance: "4.1 km",
    status: "pending",
    customerName: "Bob Smith",
    customerPhone: "+1 (555) 234-5678",
  },
  {
    id: "3",
    orderId: "ORD-003",
    address: "789 Pine St, Eastside, City 13579",
    estimatedTime: "20 min",
    distance: "3.2 km",
    status: "pending",
    customerName: "Carol Davis",
    customerPhone: "+1 (555) 345-6789",
  },
];

export default function RouteMapPage() {
  const [routes, setRoutes] = useState<DeliveryRoute[]>(mockRoutes);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const totalDistance = routes.reduce(
    (sum, route) => sum + parseFloat(route.distance),
    0
  );
  const totalTime = routes.reduce(
    (sum, route) => sum + parseInt(route.estimatedTime),
    0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStartRoute = (routeId: string) => {
    setRoutes(
      routes.map((route) =>
        route.id === routeId ? { ...route, status: "in-progress" } : route
      )
    );
  };

  const handleCompleteRoute = (routeId: string) => {
    setRoutes(
      routes.map((route) =>
        route.id === routeId ? { ...route, status: "completed" } : route
      )
    );
  };

  return (
    <div className="space-y-4 p-2 sm:p-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Route Map</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {routes.length} stops
          </Badge>
          <Badge variant="outline" className="text-sm">
            {totalDistance.toFixed(1)} km total
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {/* Route Summary */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Route className="h-4 w-4 sm:h-5 sm:w-5" />
              Route Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                  {routes.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Total Stops
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {totalTime}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Est. Time (min)
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">
                  {totalDistance.toFixed(1)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Total Distance (km)
                </div>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => window.open("https://maps.google.com", "_blank")}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Open in Maps
            </Button>
          </CardContent>
        </Card>

        {/* Route List */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              Delivery Route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {routes.map((route, index) => (
                <div
                  key={route.id}
                  className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedRoute === route.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedRoute(route.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium text-blue-600">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm sm:text-base">
                            {route.orderId}
                          </span>
                          <Badge className={getStatusColor(route.status)}>
                            {route.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {route.customerName}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                          {route.address}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {route.estimatedTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {route.distance}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 ml-2">
                      {route.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartRoute(route.id);
                          }}
                          className="text-xs px-2 py-1"
                        >
                          Start
                        </Button>
                      )}
                      {route.status === "in-progress" && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompleteRoute(route.id);
                          }}
                          className="text-xs px-2 py-1"
                        >
                          Complete
                        </Button>
                      )}
                      {route.status === "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled
                          className="text-xs px-2 py-1"
                        >
                          <Package className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">
              Route Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  Map View
                </h3>
                <p className="text-gray-500 mb-4 text-sm sm:text-base">
                  Interactive map showing your delivery route
                </p>
                <Button
                  onClick={() =>
                    window.open("https://maps.google.com", "_blank")
                  }
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
