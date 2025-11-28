
import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">
              Discover your next favorite book with BookBrew, where stories come to life.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Github className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/books" className="text-muted-foreground hover:text-foreground">All Books</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/books?genre=Fantasy" className="text-muted-foreground hover:text-foreground">Fantasy</Link></li>
              <li><Link href="/books?genre=Sci-Fi" className="text-muted-foreground hover:text-foreground">Science Fiction</Link></li>
              <li><Link href="/books?genre=Classic" className="text-muted-foreground hover:text-foreground">Classics</Link></li>
              <li><Link href="/books?genre=Romance" className="text-muted-foreground hover:text-foreground">Romance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-2">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" className="bg-background" />
              <Button type="submit" variant="default">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BookBrew. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
