
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart, CartItem } from '@/hooks/use-cart';
import { Trash2, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  return (
    <div className="flex items-center gap-4 py-4">
      <Image
        src={item.coverImage}
        alt={item.title}
        width={80}
        height={120}
        className="rounded-md object-cover"
      />
      <div className="flex-1">
        <Link href={`/books/${item.id}`} className="font-semibold hover:text-primary">{item.title}</Link>
        <p className="text-sm text-muted-foreground">{item.author}</p>
        <p className="text-sm md:hidden font-semibold">{formatCurrency(item.price)}</p>
      </div>
      <div className="hidden md:block w-24 text-center">{formatCurrency(item.price)}</div>
      <div className="w-24">
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
          className="w-16 text-center"
        />
      </div>
      <div className="hidden md:block w-24 text-center font-semibold">{formatCurrency(item.price * item.quantity)}</div>
      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
        <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
        <span className="sr-only">Remove item</span>
      </Button>
    </div>
  );
}

export default function CartPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-secondary">
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-6">Your Shopping Cart</h1>
          {cartCount > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="hidden md:flex flex-row justify-between items-center text-sm text-muted-foreground font-semibold uppercase">
                    <div className="flex-1">Product</div>
                    <div className="w-24 text-center">Price</div>
                    <div className="w-24 text-center">Quantity</div>
                    <div className="w-24 text-center">Total</div>
                    <div className="w-10"></div>
                  </CardHeader>
                  <CardContent>
                    {cartItems.map((item, index) => (
                      <div key={item.id}>
                        <CartItemRow item={item} />
                        {index < cartItems.length - 1 && <Separator />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Button variant="outline" className="mt-4" onClick={clearCart}>Clear Cart</Button>
              </div>
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartCount} items)</span>
                      <span>{formatCurrency(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(cartTotal)}</span>
                    </div>
                    <Button asChild size="lg" className="w-full mt-4">
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingCartIcon className="mx-auto h-24 w-24 text-muted-foreground" />
              <h2 className="mt-6 font-headline text-2xl font-semibold">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground">Looks like you haven't added any books yet.</p>
              <Button asChild className="mt-6">
                <Link href="/books">Start Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
