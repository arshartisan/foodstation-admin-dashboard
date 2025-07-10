import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Car,
  Bike,
  Truck,
  Calendar,
  DollarSign,
  Shield,
  Clock,
  Award,
} from "lucide-react";

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: string;
  hireDate: string;
  lastLogin: string;
  permissions: string[];
  salary: string;
  deliveryZone: string;
  vehicleType: string;
  deliveriesCompleted: number;
}

interface StaffDetailsModalProps {
  staff: Staff | null;
  isOpen: boolean;
  onClose: () => void;
}

const getRoleBadgeVariant = (role: string) => {
  switch (role.toLowerCase()) {
    case "regional manager":
      return "default";
    case "delivery person":
      return "secondary";
    default:
      return "outline";
  }
};

const getStatusBadgeColor = (status: string) => {
  return status === "active"
    ? "bg-green-100 text-green-800 hover:bg-green-100"
    : "bg-gray-100 text-gray-800 hover:bg-gray-100";
};

const getVehicleIcon = (vehicleType: string) => {
  switch (vehicleType) {
    case "Motorcycle":
      return <Bike className="h-4 w-4 text-blue-600" />;
    case "Van":
      return <Truck className="h-4 w-4 text-green-600" />;
    case "Company Car":
      return <Car className="h-4 w-4 text-purple-600" />;
    case "Bicycle":
      return <Bike className="h-4 w-4 text-orange-600" />;
    default:
      return <Car className="h-4 w-4 text-gray-600" />;
  }
};

export function StaffDetailsModal({
  staff,
  isOpen,
  onClose,
}: StaffDetailsModalProps) {
  if (!staff) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-xl font-semibold">{staff.name}</div>
              <div className="text-sm text-muted-foreground">{staff.email}</div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete profile information for team member
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Role */}
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className={getStatusBadgeColor(staff.status)}
            >
              {staff.status === "active" ? "🟢 Active" : "⚪ Inactive"}
            </Badge>
            <Badge variant={getRoleBadgeVariant(staff.role)}>
              {staff.role}
            </Badge>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">
                    {staff.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Phone</div>
                  <div className="text-sm text-muted-foreground">
                    {staff.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Work Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Work Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium">Department/Region</div>
                  <div className="text-sm text-muted-foreground">
                    {staff.department}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Delivery Zone</div>
                  <div className="text-sm text-muted-foreground">
                    {staff.deliveryZone}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium">Vehicle Type</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {getVehicleIcon(staff.vehicleType)}
                    {staff.vehicleType}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Annual Salary</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    {staff.salary}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Performance & Activity */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Award className="h-5 w-5" />
              Performance & Activity
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {staff.deliveriesCompleted}
                </div>
                <div className="text-sm text-muted-foreground">
                  Deliveries Completed
                </div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Hire Date</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {staff.hireDate}
                </div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Last Active</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {staff.lastLogin}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Permissions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permissions & Access
            </h3>
            <div className="flex flex-wrap gap-2">
              {staff.permissions.map((permission) => (
                <span
                  key={permission}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                >
                  {permission
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
