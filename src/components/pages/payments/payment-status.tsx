import { Badge } from "@/components/ui/badge";

export default function PaymentStatus({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize",
        status === "successful" && "border-emerald-500 text-emerald-500",
        status === "processing" && "border-blue-500 text-blue-500",
        status === "pending" && "border-amber-500 text-amber-500",
        status === "failed" && "border-rose-500 text-rose-500",
        status === "refunded" && "border-purple-500 text-purple-500",
        status === "cancelled" && "border-slate-500 text-slate-500"
      )}
    >
      {status}
    </Badge>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
