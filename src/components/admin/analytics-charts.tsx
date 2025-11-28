
"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import { orders, books, Book } from "@/lib/data"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

// This is a mock function to get book details for an order
// In a real app, this data would likely be part of the order object
const getOrderItems = (orderId: string): (Book & { quantity: number })[] => {
    if (orderId === 'ORD001') {
        const book1 = books.find(b => b.id === 1);
        const book2 = books.find(b => b.id === 2);
        const items = [];
        if (book1) items.push({...book1, quantity: 2});
        if (book2) items.push({...book2, quantity: 1});
        return items;
    }
    if (orderId === 'ORD002') { 
        const book = books.find(b => b.id === 3);
        return book ? [{...book, quantity: 1}] : [];
    }
    if (orderId === 'ORD003') { 
        const book = books.find(b => b.id === 9); 
        return book ? [{...book, quantity: 1}] : [];
    }
    if (orderId === 'ORD004') {
        const book = books.find(b => b.id === 5);
        return book ? [{...book, quantity: 1}] : [];
    }
    if (orderId === 'ORD005') { 
        const book = books.find(b => b.id === 11);
        return book ? [{...book, quantity: 1}] : [];
    }
     if (orderId === 'ORD006') { 
        const book = books.find(b => b.id === 16);
        return book ? [{...book, quantity: 3}] : [];
    }
     if (orderId === 'ORD007') { 
        const book1 = books.find(b => b.id === 17);
        const book2 = books.find(b => b.id === 18);
        const items = [];
        if (book1) items.push({...book1, quantity: 1});
        if (book2) items.push({...book2, quantity: 1});
        return items;
    }
    if (orderId === 'ORD008') { 
        const book = books.find(b => b.id === 18);
        return book ? [{...book, quantity: 1}] : [];
    }
    return [];
}


// Process orders to get daily revenue and sales data
const dailyData = orders.reduce((acc, order) => {
    if (order.status === 'Delivered' || order.status === 'Shipped') {
        const day = format(new Date(order.date), "MMM d");
        if (!acc[day]) {
            acc[day] = { revenue: 0, sales: 0 };
        }
        acc[day].revenue += order.total;
        
        const items = getOrderItems(order.id);
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        acc[day].sales += totalItems;
    }
    return acc;
}, {} as Record<string, { revenue: number, sales: number }>);

const chartData = Object.keys(dailyData).map(day => ({
    day,
    revenue: dailyData[day].revenue,
    sales: dailyData[day].sales,
})).sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());


const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-2))",
  }
} satisfies import("@/components/ui/chart").ChartConfig;

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
            <LineChart
            data={chartData}
            margin={{
                top: 5,
                right: 20,
                left: -10,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" stroke={chartConfig.revenue.color} />
            <YAxis yAxisId="right" orientation="right" stroke={chartConfig.sales.color} />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke={chartConfig.revenue.color} activeDot={{ r: 8 }} name="Revenue" />
            <Line yAxisId="right" type="monotone" dataKey="sales" stroke={chartConfig.sales.color} activeDot={{ r: 8 }} name="Sales (Units)" />
            </LineChart>
        </ChartContainer>
         <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
             <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" stroke={chartConfig.revenue.color} />
                <YAxis yAxisId="right" orientation="right" stroke={chartConfig.sales.color} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" fill={chartConfig.revenue.color} radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar yAxisId="right" dataKey="sales" fill={chartConfig.sales.color} radius={[4, 4, 0, 0]} name="Sales (Units)" />
            </BarChart>
        </ChartContainer>
    </div>
  )
}
