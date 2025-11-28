
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Heart, Menu, Search, ShoppingCart, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Logo } from '@/components/shared/logo';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/genres', label: 'Genres' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    if (searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
                <SheetHeader>
                    <VisuallyHidden>
                        <SheetTitle>Navigation Menu</SheetTitle>
                    </VisuallyHidden>
                </SheetHeader>
                <SheetClose asChild>
                  <Logo className="m-6" />
                </SheetClose>
              <nav className="flex flex-col gap-4 px-6">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Logo & Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Logo />
          <nav className="flex items-center gap-4 text-sm font-medium">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Logo (centered) */}
        <div className="flex-1 flex justify-center md:hidden">
             {!isSearchOpen && <Logo />}
        </div>


        {/* Icons & Search */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden md:flex items-center gap-2">
             <form onSubmit={handleSearch} className="relative">
                <Input
                    type="search"
                    name="search"
                    placeholder="Search..."
                    className="w-36 bg-secondary pr-10"
                />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" type="submit">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Submit search</span>
                </Button>
              </form>
          </div>
          <div className="flex items-center md:hidden">
              {isSearchOpen ? (
                <div className="absolute inset-0 z-50 flex h-full items-center bg-background p-4">
                     <form onSubmit={handleSearch} className="w-full relative">
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search for books..."
                            className="w-full bg-secondary pr-10"
                            autoFocus
                        />
                        <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" type="submit">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Submit search</span>
                        </Button>
                    </form>
                    <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="ml-2">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close search</span>
                    </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </Button>
              )}
          </div>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <div className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 w-4 justify-center p-0">{wishlistCount}</Badge>}
              </div>
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 w-4 justify-center p-0">{cartCount}</Badge>}
              </div>
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>

           <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Shrestha Kundu</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        codershrestha1@gmail.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/admin">Dashboard</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/login">Log out</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
        </div>

      </div>
    </header>
  );
}
