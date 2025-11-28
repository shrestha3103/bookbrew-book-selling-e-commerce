
'use client';

import { Book } from "@/lib/data";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface BookDetailsProps {
    book: Book;
}

export function BookDetails({ book }: BookDetailsProps) {
    return (
        <>
            <DialogHeader>
                <DialogTitle className="font-headline">{book.title}</DialogTitle>
                <DialogDescription>
                    by {book.author}
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div>
                    <h3 className="font-semibold">Genre</h3>
                    <Badge variant="secondary">{book.genre}</Badge>
                </div>
                 <div>
                    <h3 className="font-semibold">Price</h3>
                    <p className="text-lg font-bold">{formatCurrency(book.price)}</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Stock</h3>
                    <p>{book.stock} units available</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Description</h3>
                    <p className="text-sm text-muted-foreground">{book.description}</p>
                </div>
            </div>
        </>
    )
}
