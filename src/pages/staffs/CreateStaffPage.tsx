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
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, User, MapPin, Car, DollarSign } from "lucide-react";

interface StaffFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  deliveryZone: string;
  vehicleType: string;
  salary: string;
  permissions: string[];
}

const initialFormData: StaffFormData = {
  name: "",
  email: "",
  phone: "",
  role: "",
  department: "",
  deliveryZone: "",
  vehicleType: "",
  salary: "",
  permissions: [],
};

const roles = [
  { value: "Regional Manager", label: "Regional Manager" },
  { value: "Delivery Person", label: "Delivery Person" },
];

const departments = [
  { value: "North Region", label: "North Region" },
  { value: "South Region", label: "South Region" },
  { value: "East Region", label: "East Region" },
  { value: "West Region", label: "West Region" },
];

const vehicleTypes = [
  { value: "Motorcycle", label: "Motorcycle" },
  { value: "Van", label: "Van" },
  { value: "Bicycle", label: "Bicycle" },
  { value: "Company Car", label: "Company Car" },
];

const getDeliveryZonesByDepartment = (department: string) => {
  switch (department) {
    case "North Region":
      return ["North District", "Zone A1", "Zone A2", "Zone A3"];
    case "South Region":
      return ["South District", "Zone B1", "Zone B2", "Zone B3"];
    case "East Region":
      return ["East District", "Zone C1", "Zone C2", "Zone C3"];
    case "West Region":
      return ["West District", "Zone D1", "Zone D2", "Zone D3"];
    default:
      return [];
  }
};

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

  const handleInputChange = (field: keyof StaffFormData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-update permissions when role changes
      if (field === "role") {
        updated.permissions = getPermissionsByRole(value);
      }

      // Reset delivery zone when department changes
      if (field === "department") {
        updated.deliveryZone = "";
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
      !formData.deliveryZone ||
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

  const deliveryZones = getDeliveryZonesByDepartment(formData.department);

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
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryZone">Delivery Zone *</Label>
                <Select
                  value={formData.deliveryZone}
                  onValueChange={(value) =>
                    handleInputChange("deliveryZone", value)
                  }
                  disabled={!formData.department}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryZones.map((zone) => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle & Compensation */}
          <Card className="md:col-span-2">
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

        {/* Submit Buttons */}
      </form>
    </div>
  );
}
