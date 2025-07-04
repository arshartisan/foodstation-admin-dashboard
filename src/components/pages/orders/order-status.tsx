import { Badge } from "@/components/ui/badge";

export default function OrderStatus({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize",
        status === "completed" && "border-emerald-500 text-emerald-500",
        status === "preparing" && "border-amber-500 text-amber-500",
        status === "ready" && "border-blue-500 text-blue-500",
        status === "cancelled" && "border-rose-500 text-rose-500"
      )}
    >
      {status}
    </Badge>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
