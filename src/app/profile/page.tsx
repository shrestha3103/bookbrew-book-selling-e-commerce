
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWishlist } from '@/hooks/use-wishlist';
import { orders } from '@/lib/data';
import { BookCard } from '@/components/books/book-card';
import { Heart, Package, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from '@/lib/utils';
import { UserOrderDetails } from '@/components/profile/user-order-details';

export default function ProfilePage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-secondary">
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
          <Card className="mb-8">
            <CardContent className="p-6 flex items-center gap-6">
              <Avatar className="h-24 w-24">
                 <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-headline text-3xl font-bold">Shrestha Kundu</h1>
                <p className="text-muted-foreground">codershrestha1@gmail.com</p>
                <p className="text-sm text-muted-foreground">Member since Jan 2024</p>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Name
                            </Label>
                            <Input id="name" defaultValue="Shrestha Kundu" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Username
                            </Label>
                            <Input id="username" defaultValue="@shrestha" className="col-span-3" />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="wishlist">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wishlist">
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="orders">
                <Package className="mr-2 h-4 w-4" />
                Order History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Your Wishlist</CardTitle>
                  <CardDescription>Books you're saving for later.</CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {wishlistItems.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">Your wishlist is empty.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Your Orders</CardTitle>
                  <CardDescription>A history of your past purchases.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                        <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <p className="font-semibold">Order #{order.id}</p>
                                <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                            </div>
                            <p className="font-bold">{formatCurrency(order.total)}</p>
                            <p className="text-sm"><span className="font-semibold">Status:</span> {order.status}</p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">View Details</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <UserOrderDetails order={order} />
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
