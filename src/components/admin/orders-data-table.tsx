
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { orders as data, Order } from "@/lib/data"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "../ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { OrderDetails } from "./order-details"
import { UpdateOrderStatusForm } from "./update-order-status-form"


export function OrdersDataTable() {
  const [orders, setOrders] = React.useState(data);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  
  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => prevOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };
  
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
          const status = row.getValue("status") as string;
          const variant: "default" | "secondary" | "destructive" | "outline" = 
              status === "Delivered" ? "default" : 
              status === "Shipped" ? "outline" : 
              status === "Canceled" ? "destructive" : "secondary";
          return <Badge variant={variant}>{status}</Badge>;
      }
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "total",
      header: () => <div className="text-right">Total</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"))
        return <div className="text-right font-medium">{formatCurrency(amount)}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View Details</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Update Status</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <OrderDetails order={order} />
            </DialogContent>
             {/* This seems incorrect, let's make two separate dialogs. I'll fix this in a moment */}
          </Dialog>
        )
      },
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
    // This is needed to pass the handleUpdateStatus function to the cell renderer
    meta: {
      updateStatus: handleUpdateStatus
    }
  })

  // A helper component to render actions and avoid hook errors
  const ActionCell = ({ row }: { row: any }) => {
    const order = row.original;
    const [dialogContent, setDialogContent] = React.useState<React.ReactNode>(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleOpen = (content: React.ReactNode) => {
        setDialogContent(content);
        setIsDialogOpen(true);
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleOpen(<OrderDetails order={order} />)}>
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleOpen(
                        <UpdateOrderStatusForm 
                            order={order} 
                            onStatusUpdate={(orderId, newStatus) => {
                                handleUpdateStatus(orderId, newStatus);
                                setIsDialogOpen(false);
                            }} 
                        />
                    )}>
                        Update Status
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>{dialogContent}</DialogContent>
        </Dialog>
    )
  }

  // A new set of columns that uses the ActionCell
  const actionColumns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
          const status = row.getValue("status") as string;
          const variant: "default" | "secondary" | "destructive" | "outline" = 
              status === "Delivered" ? "default" : 
              status === "Shipped" ? "outline" : 
              status === "Canceled" ? "destructive" : "secondary";
          return <Badge variant={variant}>{status}</Badge>;
      }
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "total",
      header: () => <div className="text-right">Total</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"))
        return <div className="text-right font-medium">{formatCurrency(amount)}</div>
      },
    },
    {
      id: "actions",
      cell: ActionCell,
    },
  ]


  const actionTable = useReactTable({
    data: orders,
    columns: actionColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  })


  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by customer..."
          value={(actionTable.getColumn("customer")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            actionTable.getColumn("customer")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {actionTable.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {actionTable.getRowModel().rows?.length ? (
              actionTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={actionColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
       <div className="flex items-center justify-end space-x-2 py-4">
        <Button
            variant="outline"
            size="sm"
            onClick={() => actionTable.previousPage()}
            disabled={!actionTable.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => actionTable.nextPage()}
            disabled={!actionTable.getCanNextPage()}
          >
            Next
          </Button>
      </div>
    </div>
  )
}
