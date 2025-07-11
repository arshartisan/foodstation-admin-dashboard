import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Save,
  User,
  MapPin,
  Car,
  Settings,
  Edit2,
  Trash2,
} from "lucide-react";

interface StaffFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  vehicleType: string;
  salary: string;
  permissions: string[];
}

interface Region {
  id: string;
  name: string;
}

interface RegionFormData {
  name: string;
}

const initialFormData: StaffFormData = {
  name: "",
  email: "",
  phone: "",
  role: "",
  department: "",
  vehicleType: "",
  salary: "",
  permissions: [],
};

const roles = [
  { value: "Regional Manager", label: "Regional Manager" },
  { value: "Delivery Person", label: "Delivery Person" },
];

// Initial regions data
const initialRegions: Region[] = [
  {
    id: "1",
    name: "North Region",
  },
  {
    id: "2",
    name: "South Region",
  },
  {
    id: "3",
    name: "East Region",
  },
  {
    id: "4",
    name: "West Region",
  },
];

const vehicleTypes = [
  { value: "Motorcycle", label: "Motorcycle" },
  { value: "Van", label: "Van" },
  { value: "Bicycle", label: "Bicycle" },
  { value: "Company Car", label: "Company Car" },
];

const getPermissionsByRole = (role: string) => {
  switch (role) {
    case "Regional Manager":
      return [
        "region_management",
        "delivery_oversight",
        "staff_management",
        "performance_reports",
      ];
    case "Delivery Person":
      return ["delivery_execution", "order_updates", "customer_service"];
    default:
      return [];
  }
};

export default function CreateStaffPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StaffFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regions, setRegions] = useState<Region[]>(initialRegions);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [regionForm, setRegionForm] = useState<RegionFormData>({
    name: "",
  });

  const handleInputChange = (field: keyof StaffFormData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-update permissions when role changes
      if (field === "role") {
        updated.permissions = getPermissionsByRole(value);
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.role ||
      !formData.department ||
      !formData.vehicleType ||
      !formData.salary
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically make an API call to create the staff member
      // For now, we'll simulate the creation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Team Member Created",
        description: `${formData.name} has been successfully added to the team.`,
      });

      // Navigate back to staff list
      navigate("/staffs");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create team member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Region management functions
  const handleOpenRegionModal = (region?: Region) => {
    if (region) {
      setEditingRegion(region);
      setRegionForm({ name: region.name });
    } else {
      setEditingRegion(null);
      setRegionForm({ name: "" });
    }
    setIsRegionModalOpen(true);
  };

  const handleCloseRegionModal = () => {
    setIsRegionModalOpen(false);
    setEditingRegion(null);
    setRegionForm({ name: "" });
  };

  const handleSaveRegion = () => {
    if (!regionForm.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Region name is required.",
        variant: "destructive",
      });
      return;
    }

    if (editingRegion) {
      // Update existing region
      setRegions((prev) =>
        prev.map((region) =>
          region.id === editingRegion.id
            ? { ...region, name: regionForm.name }
            : region
        )
      );
      toast({
        title: "Region Updated",
        description: `${regionForm.name} has been updated successfully.`,
      });
    } else {
      // Add new region
      const newRegion: Region = {
        id: Date.now().toString(),
        name: regionForm.name,
      };
      setRegions((prev) => [...prev, newRegion]);
      toast({
        title: "Region Created",
        description: `${regionForm.name} has been created successfully.`,
      });
    }

    handleCloseRegionModal();
  };

  const handleDeleteRegion = (regionId: string) => {
    setRegions((prev) => prev.filter((region) => region.id !== regionId));
    toast({
      title: "Region Deleted",
      description: "Region has been deleted successfully.",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/staffs")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Add New Team Member
          </h1>
          <p className="text-muted-foreground">
            Create a new delivery team member profile
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Basic details about the team member
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Work Information
              </CardTitle>
              <CardDescription>Role and assignment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department/Region *</Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      handleInputChange("department", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.name}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleOpenRegionModal()}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle & Compensation */}
          <Card className="m">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Information
              </CardTitle>
              <CardDescription>
                Transportation and equipment details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type *</Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) =>
                    handleInputChange("vehicleType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((vehicle) => (
                      <SelectItem key={vehicle.value} value={vehicle.value}>
                        {vehicle.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/staffs")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Creating..." : "Create Team Member"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>

      {/* Region Management Modal */}
      <Dialog open={isRegionModalOpen} onOpenChange={setIsRegionModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingRegion ? "Edit Region" : "Create New Region"}
            </DialogTitle>
            <DialogDescription>
              {editingRegion
                ? "Update the region name and its delivery zones."
                : "Create a new region with delivery zones."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Region Name */}
            <div className="space-y-2">
              <Label htmlFor="regionName">Region Name *</Label>
              <Input
                id="regionName"
                value={regionForm.name}
                onChange={(e) =>
                  setRegionForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter region name"
              />
            </div>

            {/* Existing Regions List */}
            {!editingRegion && (
              <div className="space-y-2">
                <Label>Existing Regions</Label>
                <div className="border rounded-md p-3 max-h-48 overflow-y-auto">
                  {regions.length > 0 ? (
                    <div className="space-y-2">
                      {regions.map((region) => (
                        <div
                          key={region.id}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {region.name}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenRegionModal(region)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRegion(region.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No regions created yet.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseRegionModal}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveRegion}>
              <Save className="mr-2 h-4 w-4" />
              {editingRegion ? "Update Region" : "Create Region"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
