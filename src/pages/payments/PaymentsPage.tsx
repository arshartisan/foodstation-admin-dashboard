import PaymentStatus from "@/components/pages/payments/payment-status";
import { PaymentDetailsModal } from "@/components/pages/payments/payment-details-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  ChevronDown,
  CreditCard,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const payments = [
  {
    id: "PAY-001",
    orderId: "ORD-001",
    customer: "Sarah Johnson",
    amount: "$86.24",
    status: "successful",
    date: "Today, 2:30 PM",
    method: "Credit Card",
    type: "payment",
    transactionFee: "$2.58",
  },
  {
    id: "PAY-002",
    orderId: "ORD-002",
    customer: "Michael Chen",
    amount: "$53.00",
    status: "processing",
    date: "Today, 2:15 PM",
    method: "PayPal",
    type: "payment",
    transactionFee: "$1.59",
  },
  {
    id: "PAY-003",
    orderId: "ORD-003",
    customer: "Emily Rodriguez",
    amount: "$124.00",
    status: "successful",
    date: "Today, 1:45 PM",
    method: "Credit Card",
    type: "payment",
    transactionFee: "$3.72",
  },
  {
    id: "PAY-004",
    orderId: "ORD-004",
    customer: "David Kim",
    amount: "$58.24",
    status: "successful",
    date: "Today, 1:30 PM",
    method: "Apple Pay",
    type: "payment",
    transactionFee: "$1.75",
  },
  {
    id: "PAY-005",
    orderId: "ORD-005",
    customer: "Jessica Patel",
    amount: "$27.49",
    status: "refunded",
    date: "Today, 1:00 PM",
    method: "Credit Card",
    type: "refund",
    transactionFee: "$0.82",
  },
  {
    id: "PAY-006",
    orderId: "ORD-006",
    customer: "Robert Wilson",
    amount: "$124.75",
    status: "successful",
    date: "Today, 12:30 PM",
    method: "Google Pay",
    type: "payment",
    transactionFee: "$3.74",
  },
  {
    id: "PAY-007",
    customer: "Lisa Thompson",
    amount: "$89.90",
    status: "failed",
    date: "Today, 11:15 AM",
    method: "Credit Card",
    type: "payment",
    transactionFee: "$2.70",
  },
  {
    id: "PAY-008",
    orderId: "ORD-008",
    customer: "Thomas Brown",
    amount: "$67.50",
    status: "pending",
    date: "Today, 10:45 AM",
    method: "Bank Transfer",
    type: "payment",
    transactionFee: "$2.03",
  },
];

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setIsDetailsModalOpen(true);
  };

  const handleRefund = (paymentId: string) => {
    toast({
      title: "Refund processed",
      description: `Refund for payment ${paymentId} has been initiated.`,
    });
    setIsDetailsModalOpen(false);
  };

  // Calculate totals
  const totalPayments = payments
    .filter((p) => p.type === "payment" && p.status === "successful")
    .reduce((sum, p) => sum + parseFloat(p.amount.replace("$", "")), 0);

  const totalRefunds = payments
    .filter((p) => p.type === "refund")
    .reduce((sum, p) => sum + parseFloat(p.amount.replace("$", "")), 0);

  const totalFees = payments
    .filter((p) => p.status === "successful")
    .reduce((sum, p) => sum + parseFloat(p.transactionFee.replace("$", "")), 0);

  const pendingPayments = payments
    .filter((p) => p.status === "pending" || p.status === "processing")
    .reduce((sum, p) => sum + parseFloat(p.amount.replace("$", "")), 0);

  const failedPayments = payments.filter((p) => p.status === "failed").length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          Manage payment methods, process refunds, and track payment status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Payments
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <ArrowUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPayments.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <ArrowDown className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRefunds.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              -5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Processing Fees
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Transaction fees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pendingPayments.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting processing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Payments
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedPayments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="successful">Successful</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
              <TabsTrigger value="refunds">Refunds</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[180px] lg:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payments..."
                className="w-full pl-8 bg-background"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Today
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>This Week</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>This Month</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Payment Method</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Credit Card
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  PayPal
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Digital Wallet
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Bank Transfer
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              Showing {payments.length} payments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Customer
                  </TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.orderId || "N/A"}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {payment.customer}
                    </TableCell>
                    <TableCell
                      className={
                        payment.type === "refund"
                          ? "text-rose-500"
                          : payment.status === "failed"
                          ? "text-rose-500"
                          : "text-emerald-500"
                      }
                    >
                      {payment.type === "refund"
                        ? "-"
                        : payment.status === "failed"
                        ? ""
                        : "+"}
                      {payment.amount}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {payment.method}
                    </TableCell>
                    <TableCell>
                      <PaymentStatus status={payment.status} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {payment.date}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(payment)}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Download receipt</DropdownMenuItem>
                          {payment.status === "successful" &&
                            payment.type !== "refund" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-rose-500">
                                  Process refund
                                </DropdownMenuItem>
                              </>
                            )}
                          {payment.status === "failed" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Retry payment</DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{payments.length}</strong> of <strong>32</strong>{" "}
          payments
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {selectedPayment && (
        <PaymentDetailsModal
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
          id={selectedPayment.id}
          customer={selectedPayment.customer}
          amount={selectedPayment.amount}
          status={selectedPayment.status}
          date={selectedPayment.date}
          method={selectedPayment.method}
          type={selectedPayment.type}
          orderId={selectedPayment.orderId}
          transactionFee={selectedPayment.transactionFee}
          onRefund={handleRefund}
        />
      )}
    </div>
  );
}
