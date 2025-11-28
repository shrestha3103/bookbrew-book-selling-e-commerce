
'use client';

import { Order, books, Book } from "@/lib/data";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';

interface UserOrderDetailsProps {
    order: Order;
}

// This is a mock function to get book details for an order
// In a real app, this data would likely be part of the order object
const getOrderItems = (orderId: string): (Book & { quantity: number })[] => {
    // Mocking some items for demonstration
    if (orderId === 'ORD001') { // 879.20 * 2 + 1000 = 2758.4
        const book1 = books.find(b => b.id === 1); // price: 879.20
        const book2 = books.find(b => b.id === 2); // price: 1000.00
        const items = [];
        if (book1) items.push({...book1, quantity: 2});
        if (book2) items.push({...book2, quantity: 1});
        return items;
    }
    if (orderId === 'ORD002') { // 799.20
        const book = books.find(b => b.id === 3); // price: 799.20
        return book ? [{...book, quantity: 1}] : [];
    }
    if (orderId === 'ORD003') { // 2000.00
        const book = books.find(b => b.id === 9); // price: 2000.00
        return book ? [{...book, quantity: 1}] : [];
    }
    if (orderId === 'ORD004') { // 1199.20
        const book = books.find(b => b.id === 5); // price: 1199.20
        return book ? [{...book, quantity: 1}] : [];
    }
    if (orderId === 'ORD005') { // 1599.20
        const book = books.find(b => b.id === 11); // price: 1599.20
        return book ? [{...book, quantity: 1}] : [];
    }
    return [];
}


export function UserOrderDetails({ order }: UserOrderDetailsProps) {
    const statusVariant: "default" | "secondary" | "destructive" | "outline" = 
        order.status === "Delivered" ? "default" : 
        order.status === "Shipped" ? "outline" : 
        order.status === "Canceled" ? "destructive" : "secondary";

    const orderItems = getOrderItems(order.id);

    return (
        <>
            <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                    Order #{order.id} - Placed on {order.date}
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div>
                    <h3 className="font-semibold mb-2">Items Ordered</h3>
                    <div className="space-y-4">
                        {orderItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Image src={item.coverImage} alt={item.title} width={40} height={60} className="rounded" />
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p>{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Separator />
                <div className="space-y-2">
                     <div className="flex justify-between">
                        <span className="font-semibold">Status</span>
                        <Badge variant={statusVariant}>{order.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold">{formatCurrency(order.total)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
