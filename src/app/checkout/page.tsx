
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

export default function CheckoutPage() {
    const { cartItems, cartTotal, cartCount } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-secondary">
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-center">Checkout</h1>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" placeholder="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Bookworm Lane" />
                    </div>
                     <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Storyville" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" placeholder="12345" />
                        </div>
                    </div>
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="font-headline">Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="**** **** **** 1234" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">Expiration</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                        </div>
                    </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Image src={item.coverImage} alt={item.title} width={40} height={60} className="rounded" />
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p>{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t my-4" />
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p>Subtotal ({cartCount} items)</p>
                            <p>{formatCurrency(cartTotal)}</p>
                        </div>
                         <div className="flex justify-between">
                            <p>Shipping</p>
                            <p>Free</p>
                        </div>
                         <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p>{formatCurrency(cartTotal)}</p>
                        </div>
                    </div>
                    <Button size="lg" className="w-full mt-6">Place Order</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
