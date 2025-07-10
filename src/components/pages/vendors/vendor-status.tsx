import { Badge } from "@/components/ui/badge";
import { VendorStatusProps } from "@/types/vendor";

export default function VendorStatus({ status }: VendorStatusProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize",
        status === "active" && "border-emerald-500 text-emerald-500",
        status === "pending" && "border-amber-500 text-amber-500",
        status === "inactive" && "border-slate-500 text-slate-500"
      )}
    >
      {status}
    </Badge>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
