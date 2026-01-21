import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTransactions } from "../lib/league/get-transactions";
import { TransactionRow } from "../lib/types";
import DefaultThemeSetter from "./../../components/global-components/default-theme-setter";
import TransactionTable from "./../../components/recent-transactions/transaction-table";
import { Metadata } from "next";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Recent Transactions",
  description:
    "Latest ECHL transactions including signings, trades, and call-ups.",
};

const RECORD_LIMIT = 25;

export default async function Page() {
  const res = await getTransactions(RECORD_LIMIT);

  const transactions: TransactionRow[] = [];

  for (const row of res) {
    transactions.push({
      id: row.id ?? "",
      team: row.team,
      player: row.player,
      detail: row.detail,
      date: row.date
    });
  }

  return (
    <>
      <DefaultThemeSetter />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Recent Transactions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-4">
        <CardHeader>
          <h1 className="text-left text-3xl font-bold">Recent Transactions</h1>
        </CardHeader>
        <CardContent>
          <TransactionTable transactions={transactions} />
        </CardContent>
      </Card>
    </>
  );
}
