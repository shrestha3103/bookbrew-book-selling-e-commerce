import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrdersDataTable } from "@/components/admin/orders-data-table";

export default function AdminOrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Orders</CardTitle>
        <CardDescription>View and manage customer orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <OrdersDataTable />
      </CardContent>
    </Card>
  );
}
