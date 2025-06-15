import { Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import type { Transaction } from "@/types/transactions"
import { CurrentTransactionInfoTable } from "@/components/split-transactions/current-transaction-table"
import { SplitTransactionsTable } from "@/components/split-transactions/data-table/data-table"
import type { Tag } from "@/types/tags"

interface SplitTransactionProps extends React.ComponentPropsWithoutRef<typeof Sheet> {
  transaction?: Transaction
  tags: Tag[]
  onSuccess?: () => void
}

export function SplitTransaction({ transaction, tags, onSuccess, ...props }: SplitTransactionProps) {
  return (
    <Sheet {...props}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Split Transaction</SheetTitle>
          <SheetDescription>
            Split the transaction into multiple transactions.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="space-y-4">
            <div className="rounded-md border">
              <CurrentTransactionInfoTable transaction={transaction ?? {}} />
            </div>
            <Separator className="my-4" />
            <SplitTransactionsTable
              tags={tags}
              transactionId={transaction?.id ?? 0}
              transactions={transaction?.split_transactions ?? []}
              totalAmount={transaction?.amount ?? 0.0}
              onSuccess={onSuccess}
              onOpenChange={props.onOpenChange}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}


