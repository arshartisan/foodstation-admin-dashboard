import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  MapPin,
  Car,
  Phone,
  Mail,
  Calendar,
  Award,
  TrendingUp,
} from "lucide-react";

interface DeliveryPersonProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicleType: string;
  licenseNumber: string;
  deliveryZone: string;
  status: "active" | "inactive" | "on-break";
  joinDate: string;
  totalDeliveries: number;
  successRate: number;
  averageRating: number;
  currentShift: string;
}

// Mock profile data
const mockProfile: DeliveryPersonProfile = {
  id: "DEL-001",
  name: "John Doe",
  email: "john.doe@fooddelivery.com",
  phone: "+1 (555) 123-4567",
  address: "123 Delivery St, City 12345",
  vehicleType: "Motorcycle",
  licenseNumber: "DL123456789",
  deliveryZone: "Downtown & Eastside",
  status: "active",
  joinDate: "2024-01-15",
  totalDeliveries: 1247,
  successRate: 98.5,
  averageRating: 4.8,
  currentShift: "Morning (8 AM - 4 PM)",
};

export default function DeliveryProfilePage() {
  const [profile, setProfile] = useState<DeliveryPersonProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] =
    useState<DeliveryPersonProfile>(mockProfile);

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "on-break":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4 p-2 sm:p-4 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">My Profile</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={getStatusColor(profile.status)}>
            {profile.status.replace("-", " ").toUpperCase()}
          </Badge>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} size="sm">
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Profile Information */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={editProfile.name}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          name: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={editProfile.email}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          email: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={editProfile.phone}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          phone: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicleType" className="text-sm">
                      Vehicle Type
                    </Label>
                    <Select
                      value={editProfile.vehicleType}
                      onValueChange={(value) =>
                        setEditProfile({ ...editProfile, vehicleType: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                        <SelectItem value="Van">Van</SelectItem>
                        <SelectItem value="Bicycle">Bicycle</SelectItem>
                        <SelectItem value="Company Car">Company Car</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={editProfile.address}
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        address: e.target.value,
                      })
                    }
                    rows={2}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="licenseNumber" className="text-sm">
                      License Number
                    </Label>
                    <Input
                      id="licenseNumber"
                      value={editProfile.licenseNumber}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          licenseNumber: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryZone" className="text-sm">
                      Delivery Zone
                    </Label>
                    <Input
                      id="deliveryZone"
                      value={editProfile.deliveryZone}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          deliveryZone: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Button onClick={handleSave} className="w-full sm:w-auto">
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Full Name
                    </Label>
                    <p className="text-sm mt-1">{profile.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Email
                    </Label>
                    <p className="text-sm mt-1 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {profile.email}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Phone
                    </Label>
                    <p className="text-sm mt-1 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {profile.phone}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Vehicle Type
                    </Label>
                    <p className="text-sm mt-1 flex items-center gap-1">
                      <Car className="h-3 w-3" />
                      {profile.vehicleType}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Address
                  </Label>
                  <p className="text-sm mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {profile.address}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      License Number
                    </Label>
                    <p className="text-sm mt-1">{profile.licenseNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Delivery Zone
                    </Label>
                    <p className="text-sm mt-1">{profile.deliveryZone}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Current Shift
                  </Label>
                  <p className="text-sm mt-1">{profile.currentShift}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Statistics */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                  {profile.totalDeliveries}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Total Deliveries
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {profile.successRate}%
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Success Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                  {profile.averageRating}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Average Rating
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Award className="h-4 w-4 sm:h-5 sm:w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Badge variant="outline" className="w-full justify-start p-2">
                🏆 Top Performer
              </Badge>
              <Badge variant="outline" className="w-full justify-start p-2">
                ⚡ Speed Demon
              </Badge>
              <Badge variant="outline" className="w-full justify-start p-2">
                💯 Perfect Month
              </Badge>
              <Badge variant="outline" className="w-full justify-start p-2">
                🌟 Customer Favorite
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Employment Info */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              Employment Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Join Date
                </Label>
                <p className="text-sm mt-1">
                  {new Date(profile.joinDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Employee ID
                </Label>
                <p className="text-sm mt-1">{profile.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
