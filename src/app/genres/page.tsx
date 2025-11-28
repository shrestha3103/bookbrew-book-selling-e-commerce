'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { genres } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function GenresPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Explore by Genre</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            From epic fantasies to thrilling mysteries, find your next great read in our diverse collection of genres.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link key={genre} href={`/books?genre=${encodeURIComponent(genre)}`} passHref>
              <Card className="h-full flex flex-col justify-center transition-all duration-300 hover:shadow-lg hover:border-primary hover:-translate-y-1">
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle className="font-headline text-xl">{genre}</CardTitle>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
