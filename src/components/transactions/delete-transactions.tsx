import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useEditTransactions } from '@/hooks/use-transactions'
import type { Transaction } from '@/types/transactions'
import { useTransition } from 'react'

interface DeleteTransactionsProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  transactions?: Transaction[]
  onSuccess?: () => void
}

export function DeleteTransactions({
  transactions,
  onSuccess,
  ...props
}: DeleteTransactionsProps) {
  const [isDeletePending, startDeleteTransition] = useTransition()
  const { asyncDeleteTransaction } = useEditTransactions()

  const handleDeleteTransaction = () => {
    startDeleteTransition(async () => {
      for (const transaction of transactions!) {
        await asyncDeleteTransaction(transaction.id!)
      }
      props.onOpenChange?.(false)
      onSuccess?.()
    })
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This transaction will no longer be
            accessible by you or others you&apos;ve shared it with.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDeleteTransaction}
            disabled={isDeletePending}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
