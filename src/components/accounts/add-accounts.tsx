import { useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  Dialog,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAccounts } from '@/hooks/use-accounts'
import {
  accountSchema,
  AccountTypeEnum,
  CurrencyCodeEnum,
} from '@/types/schemas/accounts-schema'

const accountFormSchema = accountSchema
  .extend({
    alias: z.string({
      required_error: 'An alias is required.',
    }),
  })
  .omit({ id: true })

type AccountFormValues = z.infer<typeof accountFormSchema>

const defaultValues: Partial<AccountFormValues> = {
  type: AccountTypeEnum.Values.CHECKING,
  currency: 'EUR',
}

export function AddAccount({ onSuccess }: { onSuccess?: () => void }) {
  const { asyncAddAccount } = useAccounts()
  const [open, setOpen] = useState(false)

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  const handleSubmit = form.handleSubmit(async (data: AccountFormValues) => {
    const newAccount = accountFormSchema.parse(data)
    await asyncAddAccount(newAccount)
    setOpen(false)
    form.reset()
    onSuccess?.()
  })

  return (
    <AccountForm
      open={open}
      onOpenChange={setOpen}
      form={form}
      handleSubmit={handleSubmit}
      title="New account"
      description="Add a new account."
      dialogTrigger={
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
            Add Account
          </Button>
        </DialogTrigger>
      }
    />
  )
}

interface AccountFormProps extends React.ComponentProps<typeof Dialog> {
  title: string
  description: string
  form: UseFormReturn<AccountFormValues>
  handleSubmit: (data: any) => void
  dialogTrigger?: React.ReactNode
}

const AccountForm = ({
  title,
  description,
  form,
  handleSubmit,
  dialogTrigger,
  ...props
}: AccountFormProps) => (
  <Dialog {...props}>
    {dialogTrigger}
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="alias"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Alias</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={AccountTypeEnum.Values.CHECKING}>
                        {AccountTypeEnum.Values.CHECKING.replace(/^\w/, c =>
                          c.toUpperCase()
                        )
                          .toLowerCase()
                          .replace(/^\w/, c => c.toUpperCase())}
                      </SelectItem>
                      <SelectItem value={AccountTypeEnum.Values.SAVINGS}>
                        {AccountTypeEnum.Values.SAVINGS.replace(/^\w/, c =>
                          c.toUpperCase()
                        )
                          .toLowerCase()
                          .replace(/^\w/, c => c.toUpperCase())}
                      </SelectItem>
                      <SelectItem value={AccountTypeEnum.Values.INVESTMENTS}>
                        {AccountTypeEnum.Values.INVESTMENTS.replace(/^\w/, c =>
                          c.toUpperCase()
                        )
                          .toLowerCase()
                          .replace(/^\w/, c => c.toUpperCase())}
                      </SelectItem>
                      <SelectItem value={AccountTypeEnum.Values.OTHERS}>
                        {AccountTypeEnum.Values.OTHERS.replace(/^\w/, c =>
                          c.toUpperCase()
                        )
                          .toLowerCase()
                          .replace(/^\w/, c => c.toUpperCase())}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={CurrencyCodeEnum.Values.EUR}>
                        {CurrencyCodeEnum.Values.EUR}
                      </SelectItem>
                      <SelectItem value={CurrencyCodeEnum.Values.BRL}>
                        {CurrencyCodeEnum.Values.BRL}
                      </SelectItem>
                      <SelectItem value={CurrencyCodeEnum.Values.USD}>
                        {CurrencyCodeEnum.Values.USD}
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
)
