
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";
import { Package, Users, BookOpen, IndianRupee } from 'lucide-react';
import { BooksDataTable } from "@/components/admin/books-data-table";
import { formatCurrency } from "@/lib/utils";
import { books as initialBooks, orders, users, Book } from "@/lib/data";
import React from "react";

// This is a mock function to get book details for an order
// In a real app, this data would likely be part of the order object
const getOrderItems = (orderId: string): (Book & { quantity: number })[] => {
    // Mocking some items for demonstration
    if (orderId === 'ORD001') {
        const book1 = initialBooks.find(b => b.id === 1);
        const book2 = initialBooks.find(b => b.id === 2);
        const items = [];
        if (book1) items.push({...book1, quantity: 2});
        if (book2) items.push({...book2, quantity: 1});
        return items;
    }
    if (orderId === 'ORD002') { 
        const book = initialBooks.find(b => b.id === 3);
        return book ? [{...book, quantity: 1}] : [];
    }
    if (orderId === 'ORD003') { 
        const book = initialBooks.find(b => b.id === 9); 
        return book ? [{...book, quantity: 1}] : [];
    }
    if (orderId === 'ORD004') {
        const book = initialBooks.find(b => b.id === 5);
        return book ? [{...book, quantity: 1}] : [];
    }
    if (orderId === 'ORD005') { 
        const book = initialBooks.find(b => b.id === 11);
        return book ? [{...book, quantity: 1}] : [];
    }
    if (orderId === 'ORD006') { 
        const book = initialBooks.find(b => b.id === 16);
        return book ? [{...book, quantity: 3}] : [];
    }
    if (orderId === 'ORD007') {
        const book1 = initialBooks.find(b => b.id === 17);
        const book2 = initialBooks.find(b => b.id === 18);
        const items = [];
        if (book1) items.push({...book1, quantity: 1});
        if (book2) items.push({...book2, quantity: 1});
        return items;
    }
    if (orderId === 'ORD008') {
        const book = initialBooks.find(b => b.id === 18);
        return book ? [{...book, quantity: 1}] : [];
    }
    return [];
}


export default function AdminDashboardPage() {
  const [books, setBooks] = React.useState(initialBooks);
  
  const topSellingBooks = books.sort((a,b) => b.reviews - a.reviews).slice(0, 5);

  const totalRevenue = orders.reduce((acc, order) => {
    if (order.status === 'Delivered' || order.status === 'Shipped') {
        return acc + order.total;
    }
    return acc;
    }, 0);
  const totalCustomers = users.filter(u => u.role === 'Customer').length;
  const activeListings = books.length;
  const totalBooksSold = orders.reduce((acc, order) => {
    if (order.status === 'Delivered' || order.status === 'Shipped') {
        const items = getOrderItems(order.id);
        return acc + items.reduce((itemAcc, item) => itemAcc + item.quantity, 0);
    }
    return acc;
  }, 0);


  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              Calculated from delivered/shipped orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Total registered customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books Sold</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalBooksSold}</div>
            <p className="text-xs text-muted-foreground">
              Across all completed orders
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeListings}</div>
            <p className="text-xs text-muted-foreground">
              Books available in store
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Sales Analytics</CardTitle>
                <CardDescription>An overview of sales performance.</CardDescription>
            </CardHeader>
            <CardContent>
                <AnalyticsCharts />
            </CardContent>
        </Card>
      </div>

      <Card>
          <CardHeader>
              <CardTitle className="font-headline">Top Selling Books</CardTitle>
              <CardDescription>Your most popular books this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <BooksDataTable data={topSellingBooks} showViewOptions={false} onBooksChange={setBooks} />
          </CardContent>
      </Card>

    </div>
  );
}
