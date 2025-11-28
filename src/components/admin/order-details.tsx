
'use client';

import { Order } from "@/lib/data";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface OrderDetailsProps {
    order: Order;
}

export function OrderDetails({ order }: OrderDetailsProps) {
    const statusVariant: "default" | "secondary" | "destructive" | "outline" = 
        order.status === "Delivered" ? "default" : 
        order.status === "Shipped" ? "outline" : 
        order.status === "Canceled" ? "destructive" : "secondary";

    return (
        <>
            <DialogHeader>
                <DialogTitle>Order #{order.id}</DialogTitle>
                <DialogDescription>
                    Details for order placed on {order.date}.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div>
                    <h3 className="font-semibold">Customer Details</h3>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Order Status</h3>
                    <Badge variant={statusVariant}>{order.status}</Badge>
                </div>
                 <div>
                    <h3 className="font-semibold">Order Total</h3>
                    <p className="text-lg font-bold">{formatCurrency(order.total)}</p>
                </div>
            </div>
        </>
    )
}
