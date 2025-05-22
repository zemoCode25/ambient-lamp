"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { useEffect } from "react";

export type Record = {
  id: string;
  temperature: number;
  time: Date;
  humidity: number;
};

export const columns: ColumnDef<Record>[] = [
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rawTime = row.getValue("time") as string;

      // Strip microseconds for browser compatibility
      const cleanTime = rawTime.replace(/\.\d+/, "");
      const timeValue = new Date(cleanTime); // now a valid JS Date object

      if (isNaN(timeValue.getTime())) {
        return <div className="px-2 text-red-500">Invalid time</div>;
      }

      const formattedDate = timeValue.toLocaleString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      return <div className="px-2 font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "humidity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Humidity
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3 font-medium lowercase">
        {row.getValue("humidity")}
      </div>
    ),
  },
  {
    accessorKey: "temperature",
    header: ({ column }) => {
      return (
        <div className="flex w-full justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Temperature
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="px-2 text-right font-medium">
          {row.getValue("temperature")}
        </div>
      );
    },
  },
];

export default function DataTableDemo() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAll() {
    try {
      const response = await fetch("api/records");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setRecords(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 10000); // every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const data = {
    value: records,
  };
  const table = useReactTable({
    data: data.value,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="font-inter flex h-full w-full justify-center p-15">
          <Card className="flex h-fit w-full items-center gap-10 bg-white px-10 py-10">
            <div className="flex w-[100%] flex-col items-center justify-center sm:w-[90%]">
              <div className="flex w-full items-center py-4">
                <Input
                  placeholder="Filter emails..."
                  value={
                    (table.getColumn("time")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("time")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Columns <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="w-full rounded-md border">
                {loading ? (
                  <h1>Loading...</h1>
                ) : (
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return (
                              <TableHead key={header.id}>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                    )}
                              </TableHead>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className="p-2"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </div>
              <div className="flex w-full items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="bg-blue-700 text-white hover:bg-blue-600 hover:text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
