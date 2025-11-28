
'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BookCard } from '@/components/books/book-card';
import { BookFilters, FilterState } from '@/components/books/book-filters';
import { books } from '@/lib/data';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  search: '',
  genre: 'all',
  author: 'all',
  priceRange: [0, 3000],
  rating: 'all',
};

const BOOKS_PER_PAGE = 8;

function BooksPageContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const genre = searchParams.get('genre') || 'all';
    setFilters(prev => ({ ...prev, search, genre }));
    setCurrentPage(1);
  }, [searchParams]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const searchLower = filters.search.toLowerCase();
      const rating = parseFloat(filters.rating);

      return (
        (book.title.toLowerCase().includes(searchLower) || book.author.toLowerCase().includes(searchLower)) &&
        (filters.genre === 'all' || book.genre === filters.genre) &&
        (filters.author === 'all' || book.author === filters.author) &&
        (book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1]) &&
        (filters.rating === 'all' || book.rating >= rating)
      );
    });
  }, [filters]);

  const pageCount = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="text-center mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Explore Our Collection</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Find your next adventure. Filter by genre, author, or price to uncover hidden gems and bestselling classics.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          <aside className="hidden md:block">
            <BookFilters 
              initialState={filters}
              onApplyFilters={handleApplyFilters} 
            />
          </aside>
          <div className="md:hidden flex justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] p-0">
                <BookFilters
                  initialState={filters}
                  onApplyFilters={handleApplyFilters}
                  isMobile={true}
                />
              </SheetContent>
            </Sheet>
          </div>
          <section>
            {paginatedBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-lg text-muted-foreground">No books match your criteria.</p>
                </div>
            )}
            
            {pageCount > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                      />
                    </PaginationItem>
                    {[...Array(pageCount)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          isActive={currentPage === i + 1}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === pageCount ? 'pointer-events-none opacity-50' : undefined}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BooksPageContent />
    </Suspense>
  )
}
