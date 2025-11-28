import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersDataTable } from "@/components/admin/users-data-table";

export default function AdminUsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Customers</CardTitle>
        <CardDescription>View and manage user accounts.</CardDescription>
      </CardHeader>
      <CardContent>
        <UsersDataTable />
      </CardContent>
    </Card>
  );
}
