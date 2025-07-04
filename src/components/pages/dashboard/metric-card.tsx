import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  icon: React.ElementType;
}

export default function MetricCard({
  title,
  value,
  description,
  trend,
  trendValue,
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {trend === "up" && (
            <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
          )}
          {trend === "down" && (
            <ArrowDown className="mr-1 h-3 w-3 text-rose-500" />
          )}
          <span
            className={cn(
              trend === "up" && "text-emerald-500",
              trend === "down" && "text-rose-500"
            )}
          >
            {trendValue}
          </span>
          <span className="ml-1">{description}</span>
        </p>
      </CardContent>
    </Card>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
