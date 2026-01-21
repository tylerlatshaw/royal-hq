"use client";

import type { TransactionRow } from "@/app/lib/types";
import { DataTable } from "./data-table";
import { makeTransactionColumns } from "./columns";

type Props = { rows: TransactionRow[] };

export default function TransactionTableClient({ rows }: Props) {

    return <div>
        <DataTable columns={makeTransactionColumns()} data={rows} />
    </div>;
}