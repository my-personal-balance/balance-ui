import { useMemo, useState } from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getTransactionsTableColumns } from '@/components/transactions/data-table/columns'
import { DataTablePagination } from '@/components/transactions/data-table/data-table-pagination'
import { DataTableToolbar } from '@/components/transactions/data-table/data-table-toolbar'
import { DeleteTransactions } from '@/components/transactions/delete-transactions'
import type { Transaction } from '@/types/transactions'
import type { DataTableRowAction } from '@/types/data-table'
import {
  EditMultipleTransactions,
  EditTransaction,
} from '@/components/transactions/edit-transactions'
import { SplitTransaction } from '@/components/split-transactions/split-transactions'
import type { Tag } from '@/types/tags'
import type { Account } from '@/types/accounts'

interface DataTableProps<TData> {
  data: TData[]
  tags: Tag[]
  accounts: Account[]
  onChange?: () => void
  skipPageResetRef?: React.RefObject<boolean>
}

export function DataTable<TData>({
  data,
  tags,
  accounts,
  onChange,
}: DataTableProps<TData>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowAction, setRowAction] =
    useState<DataTableRowAction<Transaction> | null>(null)

  const columns = useMemo(
    () => getTransactionsTableColumns(setRowAction, tags, onChange),
    [tags, onChange]
  )

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData, any>[],
    state: {
      columnVisibility,
      columnFilters,
    },
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} tags={tags} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
        <EditTransaction
          tags={tags}
          accounts={accounts}
          open={rowAction?.variant === 'update'}
          onOpenChange={() => setRowAction(null)}
          transaction={rowAction?.row?.original as Transaction}
          onSuccess={() => {
            rowAction?.row?.toggleSelected(false)
            onChange?.()
          }}
        />
        <EditMultipleTransactions
          tags={tags}
          accounts={accounts}
          open={rowAction?.variant === 'update-multiple'}
          onOpenChange={() => setRowAction(null)}
          transactions={
            rowAction?.rows?.map(row => row.original) as Transaction[]
          }
          onSuccess={() => {
            rowAction?.rows?.forEach(row => row.toggleSelected(false))
            onChange?.()
          }}
        />
        <DeleteTransactions
          open={
            rowAction?.variant === 'delete' ||
            rowAction?.variant === 'delete-multiple'
          }
          onOpenChange={() => setRowAction(null)}
          transactions={
            rowAction?.row?.original
              ? [rowAction?.row.original]
              : (rowAction?.rows?.map(row => row.original) as Transaction[])
          }
          onSuccess={() => {
            onChange?.()
          }}
        />
        <SplitTransaction
          tags={tags}
          open={rowAction?.variant === 'split'}
          onOpenChange={() => setRowAction(null)}
          transaction={rowAction?.row?.original as Transaction}
          onSuccess={() => {
            onChange?.()
          }}
        />
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
