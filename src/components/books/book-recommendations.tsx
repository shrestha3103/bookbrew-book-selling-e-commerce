import { getPersonalizedBookRecommendations } from '@/ai/flows/personalized-book-recommendations';
import { books, Book } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookCard } from './book-card';
import { Card, CardContent } from '../ui/card';

export async function BookRecommendations() {
  const userHistory = {
    browsingHistory: ["The Catcher in the Rye", "Moby Dick"],
    purchaseHistory: ["The Hobbit"],
    wishlist: ["1984"],
  };

  let recommendedBooks: Book[] = [];
  try {
    const result = await getPersonalizedBookRecommendations(userHistory);
    const recommendedTitles = result.recommendations;
    
    recommendedBooks = books.filter(book => recommendedTitles.includes(book.title));
    
    // If AI returns too few, fill with other popular books not in user history
    if (recommendedBooks.length < 5) {
        const historyTitles = new Set([...userHistory.browsingHistory, ...userHistory.purchaseHistory, ...userHistory.wishlist]);
        const fallbackBooks = books.filter(book => !historyTitles.has(book.title) && !recommendedBooks.find(rb => rb.id === book.id));
        recommendedBooks.push(...fallbackBooks.slice(0, 5 - recommendedBooks.length));
    }

  } catch (error) {
    console.error("Failed to get book recommendations:", error);
    // Fallback to popular books if AI fails
    recommendedBooks = books.slice(5, 10);
  }

  if (recommendedBooks.length === 0) {
    return (
        <div className="mt-8 text-center text-muted-foreground">
            Could not find any recommendations for you at this time.
        </div>
    )
  }

  return (
    <div className="mt-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recommendedBooks.map((book, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div className="p-1">
                <BookCard book={book} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
