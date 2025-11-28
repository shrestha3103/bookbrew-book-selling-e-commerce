
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { books, Book } from '@/lib/data';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useToast } from '@/hooks/use-toast';
import { cn, formatCurrency } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React from 'react';

export default function BookDetailPage({ params: paramsProp }: { params: { bookId: string } }) {
  const params = React.use(paramsProp);
  const bookId = parseInt(params.bookId, 10);
  const book = books.find((b) => b.id === bookId);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  if (!book) {
    notFound();
  }
  
  const isBookInWishlist = isInWishlist(book.id);

  const handleAddToCart = () => {
    addToCart(book);
    toast({
      title: "Added to Cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    if (isBookInWishlist) {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 md:py-12 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex justify-center items-start">
            <Image
              src={book.coverImage}
              alt={book.title}
              width={500}
              height={750}
              className="rounded-lg shadow-2xl object-cover w-full max-w-md aspect-[2/3]"
              data-ai-hint={book.imageHint}
            />
          </div>
          <div className="space-y-4">
            <Badge variant="secondary">{book.genre}</Badge>
            <h1 className="font-headline text-3xl md:text-4xl font-bold">{book.title}</h1>
            <p className="text-lg text-muted-foreground">by {book.author}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-5 w-5", i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300')} />
                ))}
              </div>
              <span className="text-muted-foreground">{book.rating.toFixed(1)} ({book.reviews} reviews)</span>
            </div>
            
            <div className="text-3xl font-bold">
              {formatCurrency(book.price)}
              {book.originalPrice && <span className="ml-4 text-xl font-normal text-muted-foreground line-through">{formatCurrency(book.originalPrice)}</span>}
            </div>
            
            <p className="text-green-600 font-semibold">{book.stock > 0 ? `In Stock (${book.stock} available)` : 'Out of Stock'}</p>
            
            <Separator />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={book.stock === 0}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1" onClick={handleToggleWishlist}>
                <Heart className={cn("mr-2 h-5 w-5", isBookInWishlist ? 'text-red-500 fill-current' : '')} />
                {isBookInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger className="font-headline text-lg">Description</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {book.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="reviews">
                <AccordionTrigger className="font-headline text-lg">Reviews</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">Reviews coming soon!</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
