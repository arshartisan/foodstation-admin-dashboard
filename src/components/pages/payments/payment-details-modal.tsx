"use client";

import { CreditCard, Receipt, User, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import PaymentStatus from "./payment-status";

interface PaymentDetailsProps {
  id: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
  method: string;
  type: string;
  orderId?: string;
  transactionFee?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRefund?: (paymentId: string) => void;
}

export function PaymentDetailsModal({
  id,
  customer,
  amount,
  status,
  date,
  method,
  type,
  orderId,
  transactionFee,
  open,
  onOpenChange,
  onRefund,
}: PaymentDetailsProps) {
  const netAmount = transactionFee
    ? (
        parseFloat(amount.replace("$", "")) -
        parseFloat(transactionFee.replace("$", ""))
      ).toFixed(2)
    : amount.replace("$", "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment Details - {id}
          </DialogTitle>
          <DialogDescription>
            View complete information about this payment transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Customer
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{customer}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Status
              </h3>
              <div className="mt-1">
                <PaymentStatus status={status} />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Payment Method
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{method}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Date & Time
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{date}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Info */}
          {orderId && (
            <>
              <div>
                <h3 className="text-sm font-medium mb-3">Related Order</h3>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">Order ID: {orderId}</p>
                    <p className="text-sm text-muted-foreground">
                      Payment for customer order
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Order
                  </Button>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Payment Summary */}
          <div>
            <h3 className="text-sm font-medium mb-3">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Payment Amount</span>
                <span
                  className={
                    type === "refund" ? "text-rose-500" : "text-emerald-500"
                  }
                >
                  {type === "refund" ? "-" : "+"}
                  {amount}
                </span>
              </div>
              {transactionFee && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Transaction Fee</span>
                  <span>-{transactionFee}</span>
                </div>
              )}
              {transactionFee && (
                <>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Net Amount</span>
                    <span className="text-emerald-500">${netAmount}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-sm">
                <span>Payment Type</span>
                <Badge variant="secondary" className="capitalize">
                  {type}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="outline">Print Receipt</Button>
          {status === "successful" && type !== "refund" && onRefund && (
            <Button variant="destructive" onClick={() => onRefund(id)}>
              Process Refund
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
