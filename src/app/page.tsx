import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookCard } from '@/components/books/book-card';
import { BookRecommendations } from '@/components/books/book-recommendations';
import { books, Book } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-banner');
  const featuredBooks = books.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[70vh] text-primary-foreground">
          <div className="absolute inset-0 bg-primary/80 z-10" />
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Discover Your Next Chapter
            </h1>
            <p className="mt-4 md:mt-6 max-w-2xl text-lg md:text-xl">
              At BookBrew, we blend the love of reading with the joy of discovery. Explore worlds, meet characters, and find stories that resonate with you.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/books">Browse All Books</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Featured Books</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredBooks.map((book: Book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Personalized For You</h2>
            <p className="mt-2 text-center text-muted-foreground max-w-2xl mx-auto">
              Based on your recent activity, here are some books we think you'll love.
            </p>
            <Suspense fallback={<RecommendationSkeleton />}>
              <BookRecommendations />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function RecommendationSkeleton() {
  return (
    <div className="mt-8 relative">
      <div className="overflow-hidden">
        <div className="flex -ml-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/3 pl-4">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[300px] w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
