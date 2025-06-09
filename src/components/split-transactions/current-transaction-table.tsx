import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Transaction } from "@/types/transactions"
import { formatNumber } from "@/lib/utils"

export function CurrentTransactionInfoTable({ transaction }: { transaction: Transaction }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/6">Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow key={transaction.id}>
          <TableCell className="font-medium">{format(transaction.date ?? new Date(), "dd/MM/yyyy")}</TableCell>
          <TableCell>{transaction.description}</TableCell>
          <TableCell className="text-right">{
            formatNumber(
              transaction.amount ?? 0, 
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                style: "currency",
                currency: "EUR" 
              }
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}