import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
} from '@/components/ui/form'
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from '@/components/ui/select'
import { Input } from '../ui/input'
import { useEditTransactions } from '@/hooks/use-transactions'
import type { Account } from '@/types/accounts'

const uploadTransactionsFormSchema = z.object({
  account_id: z.string(),
  file: z.instanceof(File),
})

type UploadTransactionsFormValues = z.infer<typeof uploadTransactionsFormSchema>

const defaultValues: Partial<UploadTransactionsFormValues> = {}

export function UploadTransactions({
  accountId,
  accounts,
  onChange,
}: {
  accountId?: number
  accounts: Account[]
  onChange: () => void
}) {
  const { asyncUploadTransaction } = useEditTransactions()
  const [open, setOpen] = useState(false)

  const form = useForm<UploadTransactionsFormValues>({
    resolver: zodResolver(uploadTransactionsFormSchema),
    defaultValues,
  })

  useEffect(() => {
    if (accountId) {
      form.setValue('account_id', accountId.toString())
    }
  }, [accountId])

  const handleSubmit = form.handleSubmit(
    async (data: UploadTransactionsFormValues) => {
      await asyncUploadTransaction(Number(data.account_id), data.file)
      setOpen(false)
      form.reset()
      onChange()
    }
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <Upload />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload transactions</DialogTitle>
          <DialogDescription>
            Upload a file with transactions to one of your accounts.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="account_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map(account => (
                          <SelectItem
                            key={account.id}
                            value={account.id?.toString() || ''}
                          >
                            {account.alias}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={e => {
                          const file = e.target.files?.[0]
                          field.onChange(file)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
