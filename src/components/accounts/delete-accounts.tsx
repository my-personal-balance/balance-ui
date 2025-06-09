import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAccounts } from "@/hooks/use-accounts";

interface DeleteTransactionsProps 
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  accountId: number
  onSuccess?: () => void
}

export function DeleteTransactions({
  accountId,
  onSuccess,
  ...props
}: DeleteTransactionsProps) {
  const [isDeletePending, startDeleteTransition] = useTransition()
  const { asyncDeleteAccount } = useAccounts()

  const handleDeleteTransaction = () => {
    startDeleteTransition(async () => {
      await asyncDeleteAccount(accountId!)
      props.onOpenChange?.(false)
      onSuccess?.()
    })
  }
  
  return (
    <>
      <AlertDialog {...props}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This account will no longer be
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
    </>
  )
}     