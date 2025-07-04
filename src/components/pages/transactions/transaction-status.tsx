import { Badge } from "@/components/ui/badge";

export default function TransactionStatus({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize",
        status === "completed" && "border-emerald-500 text-emerald-500",
        status === "pending" && "border-amber-500 text-amber-500",
        status === "refunded" && "border-rose-500 text-rose-500"
      )}
    >
      {status}
    </Badge>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
