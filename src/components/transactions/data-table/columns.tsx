import type { ColumnDef } from "@tanstack/react-table"

import {
  ArrowLeftRight,
} from "lucide-react"
import { formatNumber } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/transactions/data-table/data-table-column-header"
import { DataTableRowActions, DataTableRowActionsMulti } from "@/components/transactions/data-table/data-table-row-actions"
import type { Account } from "@/types/accounts"
import type { Transaction } from "@/types/transactions"
import type { DataTableRowAction } from "@/types/data-table"

export function getTransactionsTableColumns(
  setRowAction: (rowAction: DataTableRowAction<Transaction>) => void
): ColumnDef<Transaction, any>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => <div className="w-[100px]">{row.getValue("date")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        let signal = null
        switch(row.original.transaction_type) {
          case "INCOME":
            signal = "+";
            break;
          case "TRANSFER":
            signal = <ArrowLeftRight width={15} />;
            break;
          default:
            signal = "-";
        }

        return (
          <div className="w-[90px]">{signal} {formatNumber(row.getValue("amount"), {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: "balance",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Net Worth" />
      ),
      cell: ({ row }) => {
        const balance = row.getValue("balance") as number
        const signal = balance >= 0.0 ? "+" : "-"
        return (<div className="w-[90px]">{signal} {formatNumber(balance, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>)
      },
      enableSorting: false,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.getValue("description")}
            </span>
          </div>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const tag = row.original.tag

        return (
          <div className="flex space-x-2">
            <span className="max-w-[160px] truncate font-medium">
              {tag && <Badge variant="outline">{tag.value}</Badge>}
            </span>
          </div>
        )
      },
      filterFn: (row, _id, value) => {
        return value.includes(row.original.tag_id?.toString() ?? '')
      },
      enableSorting: false,
    },
    {
      accessorKey: "account",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account" />
      ),
      cell: ({ row }) => {
        const account = row.getValue("account") as Account;
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {account && account.alias}
            </span>
          </div>
        )
      },
      enableSorting: false,
    },
    {
      id: "actions",
      header: ({ table }) => {
        if (table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()) {
          return <DataTableRowActionsMulti rows={table.getSelectedRowModel().rows} setRowAction={setRowAction} />
        }
        return <div />
      },
      cell: ({ row }) => <DataTableRowActions row={row} setRowAction={setRowAction} />,
    },
  ]
}