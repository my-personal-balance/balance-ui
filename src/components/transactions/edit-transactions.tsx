import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Dialog } from '@/components/ui/dialog'
import { transactionSchema } from '@/components/transactions/data-table/data/schema'
import { useEditTransactions } from '@/hooks/use-transactions'
import type { Transaction } from '@/types/transactions'
import type { Tag } from '@/types/tags'
import type { Account } from '@/types/accounts'
import { TransactionForm } from '@/components/transactions/transactions-form'

export const addTransactionSchema = transactionSchema
  .extend({
    account_id: z.coerce.string({
      required_error: 'An account is required.',
    }),
    amount: z.number({
      required_error: 'An amount is required.',
    }),
    date: z.coerce.date(),
  })
  .omit({ id: true, balance: true, account: true, tag: true })

type TransactionFormValues = z.infer<typeof addTransactionSchema>

interface EditTransactionProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  transaction: Transaction
  tags: Tag[]
  accounts: Account[]
  onSuccess?: () => void
}

export function EditTransaction({
  transaction,
  tags,
  accounts,
  onSuccess,
  ...props
}: EditTransactionProps) {
  const [isUpdatePending, startUpdateTransition] = useTransition()
  const { asyncUpdateTransaction } = useEditTransactions()

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      amount: 0.0,
    },
    values: transaction ? addTransactionSchema.parse(transaction) : undefined,
  })

  const handleSubmit = form.handleSubmit(
    async (data: TransactionFormValues) => {
      startUpdateTransition(async () => {
        const newTransaction = transactionSchema.parse(data)
        await asyncUpdateTransaction(transaction.id!, newTransaction)
        form.reset()
        props.onOpenChange?.(false)
        onSuccess?.()
      })
    }
  )

  return (
    <TransactionForm
      title="Edit transaction"
      description="Edit the transaction details."
      form={form}
      handleSubmit={handleSubmit}
      tags={tags}
      accounts={accounts}
      isUpdatePending={isUpdatePending}
      {...props}
    />
  )
}

export const editTransactionSchema = transactionSchema
  .extend({
    account_id: z.coerce.number().nullable().optional(),
    amount: z.number().nullable().optional(),
    date: z.coerce.date().nullable().optional(),
  })
  .omit({ balance: true, account: true, tag: true })

type EditTransactionFormValues = z.infer<typeof editTransactionSchema>

interface EditMultipleTransactionsProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  transactions: Transaction[]
  tags: Tag[]
  accounts: Account[]
  onSuccess?: () => void
}

export function EditMultipleTransactions({
  transactions,
  tags,
  accounts,
  onSuccess,
  ...props
}: EditMultipleTransactionsProps) {
  const [isUpdatePending, startUpdateTransition] = useTransition()
  const { asyncUpdateTransactions } = useEditTransactions()

  const form = useForm<EditTransactionFormValues>({
    resolver: zodResolver(editTransactionSchema),
  })

  const handleSubmit = form.handleSubmit(
    async (data: EditTransactionFormValues) => {
      startUpdateTransition(async () => {
        const newTransactions = transactions.map(t =>
          editTransactionSchema.parse({
            ...data,
            id: t.id,
          })
        )
        await asyncUpdateTransactions(newTransactions)
        form.reset()
        props.onOpenChange?.(false)
        onSuccess?.()
      })
    }
  )

  return (
    <TransactionForm
      title="Edit transactions"
      description="Edit the transactions details."
      form={form}
      handleSubmit={handleSubmit}
      tags={tags}
      accounts={accounts}
      isUpdatePending={isUpdatePending}
      {...props}
    />
  )
}
