
'use client';

import { useState } from "react";
import { Order } from "@/lib/data";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UpdateOrderStatusFormProps {
    order: Order;
    onStatusUpdate: (orderId: string, newStatus: Order['status']) => void;
}

const statuses: Order['status'][] = ['Pending', 'Shipped', 'Delivered', 'Canceled'];

export function UpdateOrderStatusForm({ order, onStatusUpdate }: UpdateOrderStatusFormProps) {
    const [selectedStatus, setSelectedStatus] = useState<Order['status']>(order.status);
    
    const handleSubmit = () => {
        onStatusUpdate(order.id, selectedStatus);
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Update Order Status</DialogTitle>
                <DialogDescription>
                    Update the status for order #{order.id}.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="status">Order Status</Label>
                    <Select value={selectedStatus} onValueChange={(value: Order['status']) => setSelectedStatus(value)}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map(status => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleSubmit}>Update Status</Button>
            </DialogFooter>
        </>
    )
}
