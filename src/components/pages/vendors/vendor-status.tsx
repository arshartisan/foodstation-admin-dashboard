import { Badge } from "@/components/ui/badge";

export default function RestaurantStatus({ status }: { status: string }) {
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
