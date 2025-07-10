"use client";

import {
  Check,
  Clock,
  DollarSign,
  MapPin,
  Star,
  Store,
  User,
  Package,
  Utensils,
  ShoppingCart,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { VendorDetailsModalProps } from "@/types/vendor";

export function VendorDetailsModal({
  open,
  onOpenChange,
  vendor,
  onStatusUpdate,
}: VendorDetailsModalProps) {
  const handleStatusUpdate = (status: "active" | "pending" | "inactive") => {
    if (vendor) {
      onStatusUpdate(vendor.id, status);
      onOpenChange(false);
    }
  };

  const getVendorIcon = (type: "food" | "grocery") => {
    return type === "food" ? (
      <Utensils className="h-5 w-5 text-orange-500" />
    ) : (
      <ShoppingCart className="h-5 w-5 text-green-500" />
    );
  };

  const getVendorTypeLabel = (type: "food" | "grocery") => {
    return type === "food" ? "Food Vendor" : "Grocery Vendor";
  };

  if (!vendor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getVendorIcon(vendor.type)}
            {vendor.name}
          </DialogTitle>
          <DialogDescription>View and manage vendor details</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Vendor Information
                  </span>
                </div>
                <div className="pl-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <span className="text-sm font-medium">{vendor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <span className="text-sm font-medium">
                      {getVendorTypeLabel(vendor.type)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Category:
                    </span>
                    <span className="text-sm font-medium">
                      {vendor.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Status:
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        vendor.status === "active"
                          ? "border-emerald-500 text-emerald-500"
                          : vendor.status === "pending"
                          ? "border-amber-500 text-amber-500"
                          : "border-slate-500 text-slate-500"
                      }
                    >
                      {vendor.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Owner Information</span>
                </div>
                <div className="pl-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Owner:
                    </span>
                    <span className="text-sm font-medium">{vendor.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Phone:
                    </span>
                    <span className="text-sm font-medium">
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Email:
                    </span>
                    <span className="text-sm font-medium">
                      {vendor.owner.toLowerCase().replace(" ", ".")}@email.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground">
                  {vendor.location}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Joined</span>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground">
                  {vendor.joinDate}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Rating</span>
                </div>
                <div className="pl-6">
                  <p className="text-2xl font-bold">
                    {vendor.status !== "pending" ? vendor.rating : "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {vendor.status !== "pending"
                      ? "Average rating"
                      : "No rating yet"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Orders</span>
                </div>
                <div className="pl-6">
                  <p className="text-2xl font-bold">
                    {vendor.status !== "pending" ? vendor.orders : "0"}
                  </p>
                  <p className="text-sm text-muted-foreground">Total orders</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Revenue</span>
                </div>
                <div className="pl-6">
                  <p className="text-2xl font-bold">
                    {vendor.status !== "pending" ? vendor.revenue : "$0"}
                  </p>
                  <p className="text-sm text-muted-foreground">Total revenue</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Required Documents</span>
              </div>
              <div className="pl-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Business License
                  </span>
                  <Badge
                    variant="outline"
                    className="border-emerald-500 text-emerald-500"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {vendor.type === "food"
                      ? "Food Safety Certificate"
                      : "Health Department Permit"}
                  </span>
                  <Badge
                    variant="outline"
                    className="border-emerald-500 text-emerald-500"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Tax Registration
                  </span>
                  <Badge
                    variant="outline"
                    className="border-emerald-500 text-emerald-500"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Insurance Certificate
                  </span>
                  <Badge
                    variant="outline"
                    className="border-amber-500 text-amber-500"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {vendor.status === "pending" && (
              <Button
                onClick={() => handleStatusUpdate("active")}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Approve Vendor
              </Button>
            )}
            {vendor.status === "active" && (
              <Button
                variant="outline"
                onClick={() => handleStatusUpdate("inactive")}
              >
                Deactivate Vendor
              </Button>
            )}
            {vendor.status === "inactive" && (
              <Button
                onClick={() => handleStatusUpdate("active")}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Activate Vendor
              </Button>
            )}
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
