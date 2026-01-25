"use client";

import * as React from "react";
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./../../components/ui/table";
import { cn } from "@/app/lib/utils";

type ColumnMeta = { className?: string };

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
};

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="text-left md:text-center rounded-md border border-black/10 dark:border-white/10 overflow-x-auto overflow-y-visible">
            <Table className="min-w-[750px] w-full">
                <TableHeader>
                    {table.getHeaderGroups().map((hg) => (
                        <TableRow key={hg.id}>
                            {hg.headers.map((header) => {
                                const canSort = header.column.getCanSort();
                                const meta = header.column.columnDef.meta as ColumnMeta | undefined;

                                return <TableHead
                                    key={header.id}
                                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                    className={[
                                        canSort ? "mx-auto cursor-pointer select-none" : "",
                                        meta?.className ?? "",
                                        "bg-muted z-30"
                                    ].join(" ").trim()}
                                >
                                    <div className="flex items-center justify-start md:justify-center gap-1 font-semibold">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </div>
                                </TableHead>;
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="group hover:bg-muted/50 border border-b">
                                {row.getVisibleCells().map((cell) => {
                                    const meta = cell.column.columnDef.meta as ColumnMeta | undefined;

                                    return <TableCell
                                        key={cell.id}
                                        className={cn(
                                            "group-hover:bg-muted/50",
                                            meta?.className ?? ""
                                        )}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>;
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center py-6">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}