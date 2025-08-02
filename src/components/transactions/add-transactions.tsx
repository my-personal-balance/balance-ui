import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { transactionSchema } from '@/components/transactions/data-table/data/schema'
import { useEditTransactions } from '@/hooks/use-transactions'
import { TransactionForm } from '@/components/transactions/transactions-form'
import type { Tag } from '@/types/tags'
import type { Account } from '@/types/accounts'

export const addTransactionSchema = transactionSchema
  .extend({
    account_id: z.string({
      required_error: 'An account is required.',
    }),
    amount: z.number({
      required_error: 'An amount is required.',
    }),
    date: z.coerce.date(),
  })
  .omit({ id: true, balance: true, account: true })

type TransactionFormValues = z.infer<typeof addTransactionSchema>

const defaultValues: Partial<TransactionFormValues> = {
  amount: Number(0.0),
}

export function AddTransaction({
  accountId,
  tags,
  accounts,
  onChange,
}: {
  accountId?: number
  tags: Tag[]
  accounts: Account[]
  onChange: () => void
}) {
  const { asyncAddTransaction } = useEditTransactions()
  const [open, setOpen] = useState(false)

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      ...defaultValues,
      account_id: accountId?.toString() || '',
    },
  })

  const handleSubmit = form.handleSubmit(
    async (data: TransactionFormValues) => {
      const newTransaction = transactionSchema.parse(data)
      await asyncAddTransaction(newTransaction)
      setOpen(false)
      form.reset()
      onChange()
    }
  )

  return (
    <TransactionForm
      form={form}
      handleSubmit={handleSubmit}
      tags={tags}
      accounts={accounts}
      isUpdatePending={false}
      title="New transaction"
      description="Add a new transaction to one of your accounts."
      open={open}
      onOpenChange={setOpen}
      dialogTrigger={
        <DialogTrigger asChild>
          <Button variant="secondary" size="icon">
            <Plus />
          </Button>
        </DialogTrigger>
      }
    />
  )
}
