
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import type { Book } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useToast } from '@/hooks/use-toast';
import { cn, formatCurrency } from '@/lib/utils';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(book);
    toast({
      title: "Added to Cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
      toast({
        title: "Removed from Wishlist",
        description: `${book.title} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(book);
      toast({
        title: "Added to Wishlist",
        description: `${book.title} has been added to your wishlist.`,
      });
    }
  };

  const isBookInWishlist = isInWishlist(book.id);

  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/books/${book.id}`}>
            <Image
              src={book.coverImage}
              alt={book.title}
              width={400}
              height={600}
              className="object-cover w-full h-auto aspect-[2/3]"
              data-ai-hint={book.imageHint}
            />
          </Link>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 rounded-full h-9 w-9 bg-background/70 hover:bg-background"
            onClick={handleToggleWishlist}
          >
            <Heart className={cn("h-5 w-5", isBookInWishlist ? 'text-red-500 fill-current' : 'text-foreground')} />
          </Button>
        </div>
        <div className="p-4 space-y-2">
          <Link href={`/books/${book.id}`}>
            <h3 className="font-headline text-lg font-semibold truncate group-hover:text-primary">{book.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold">{formatCurrency(book.price)}</span>
              {book.originalPrice && <span className="ml-2 text-sm text-muted-foreground line-through">{formatCurrency(book.originalPrice)}</span>}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{book.rating}</span>
            </div>
          </div>
          <Button className="w-full mt-2" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
