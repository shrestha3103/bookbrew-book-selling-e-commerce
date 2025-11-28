
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from 'lucide-react';
import { BooksDataTable } from "@/components/admin/books-data-table";
import { AddBookForm } from "@/components/admin/add-book-form";
import { Book, books as initialBooks } from "@/lib/data";

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddBook = (newBook: Omit<Book, 'id' | 'rating' | 'reviews' | 'coverImage' | 'imageHint'>) => {
    const bookWithDefaults: Book = {
      ...newBook,
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
      rating: 0,
      reviews: 0,
      coverImage: `https://picsum.photos/seed/${books.length + 1}/400/600`,
      imageHint: 'book cover',
      originalPrice: newBook.originalPrice || undefined,
    };
    setBooks(prev => [bookWithDefaults, ...prev]);
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">Books</CardTitle>
                <CardDescription>Manage your book catalog.</CardDescription>
            </div>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Book
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <AddBookForm onBookAdd={handleAddBook} />
                </DialogContent>
            </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <BooksDataTable data={books} onBooksChange={setBooks} />
      </CardContent>
    </Card>
  );
}
