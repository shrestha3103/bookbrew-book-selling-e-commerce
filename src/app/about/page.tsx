
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BookOpen, Users, Target } from 'lucide-react';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'hero-banner');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-[40vh] text-primary-foreground">
          <div className="absolute inset-0 bg-primary/80 z-10" />
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
          <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center">
            <h1 className="font-headline text-4xl md:text-6xl font-bold">About BookBrew</h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              Brewing stories and bottling adventures for book lovers everywhere.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-headline text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded in 2024, BookBrew started as a small passion project by a group of avid readers who wanted to create a space where discovering new books felt as comforting as a warm cup of coffee. We believed that finding your next great read should be an adventure, not a chore.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, BookBrew is a thriving online community and bookstore, dedicated to curating a diverse collection of books from all genres. We blend cutting-edge technology with a personal touch to offer personalized recommendations and a seamless shopping experience.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex-row items-center gap-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <CardTitle className="font-headline">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">To connect readers with stories that inspire, entertain, and enlighten.</p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex-row items-center gap-4">
                    <Users className="h-8 w-8 text-primary" />
                    <CardTitle className="font-headline">Our Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">To build a vibrant community for book lovers to share their passion.</p>
                  </CardContent>
                </Card>
                 <Card className="col-span-2">
                  <CardHeader className="flex-row items-center gap-4">
                    <Target className="h-8 w-8 text-primary" />
                    <CardTitle className="font-headline">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">To be the most beloved destination for book discovery and purchase, making literature accessible to everyone, everywhere.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
