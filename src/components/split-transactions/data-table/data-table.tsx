import { useMemo, useTransition } from "react"
import { z } from "zod"
import { PlusIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { SplitTransaction } from "@/types/split-transaction"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTags } from "@/hooks/use-tags"
import { useForm, useFieldArray} from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { splitTransactionSchema } from "@/types/schemas/split-transaction-schema"
import { useSplitTransactions } from "@/hooks/use-split-transactions"
import { ScrollArea } from "@/components/ui/scroll-area"

export const splitTransactionFormSchema = splitTransactionSchema.extend({
  amount: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({
      required_error: "An amount is required.",
    })
    .min(0.01, 'Amount must be greater than 0.01')
  )
}).omit({ id: true, tag: true });

type SplitTransactionFormValues = z.infer<typeof splitTransactionFormSchema>

interface SplitTransactionsTableProps {
  transactions: SplitTransaction[]
  transactionId: number
  totalAmount: number
  onSuccess?: () => void
  onOpenChange?: (open: boolean) => void
}

interface SplitTransactionsTableFormProps {
  transactions: SplitTransactionFormValues[]
}

export function SplitTransactionsTable({ transactions, transactionId, totalAmount, onSuccess, onOpenChange }: SplitTransactionsTableProps) {
  const { tags } = useTags()
  const [isPending, startTransition] = useTransition()
  const { asyncSetSplitTransactions } = useSplitTransactions()

  const form = useForm<SplitTransactionsTableFormProps>({
    defaultValues: {
      transactions: transactions,
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'transactions', // The name of the array field in your form data
  })

  const handleSubmit = form.handleSubmit((data: SplitTransactionsTableFormProps) => {
    startTransition(async () => {
      await asyncSetSplitTransactions(transactionId, data.transactions)
      onSuccess?.()
      onOpenChange?.(false)
    })
  })

  const remainingAmount = useMemo(() => {
    const currentSplitAmount = form.watch('transactions').reduce((acc, curr) => acc + curr.amount, 0)
    return totalAmount - currentSplitAmount
  }, [totalAmount, form.watch('transactions')])

  return (
    <div className="rounded-md border">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-max-4/6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id} className="hover:bg-transparent">
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`transactions.${index}.description`}
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="w-1/6">
                    <FormField
                      control={form.control}
                      name={`transactions.${index}.tag_id`}
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a tag" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tags.map(tag => <SelectItem key={tag.id} value={tag.id.toString()}>{tag.value}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="w-1/12">
                    <FormField
                      control={form.control}
                      name={`transactions.${index}.amount`}
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              inputMode="decimal"
                              {...field}
                              {...form.register(`transactions.${index}.amount`, { valueAsNumber: true })}
                              />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="w-1/12">
                    <Button variant="ghost" className="text-destructive" onClick={() => remove(index)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow key={-1}>
                <TableCell colSpan={4}>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => append({ transaction_id: transactionId, description: '', amount: 0, tag_id: undefined })}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Transaction
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </ScrollArea>
          <Separator className="my-4" />
          <div className="flex p-4">
            <Label>Remaining Amount</Label>
            <Label className="pl-2">{remainingAmount?.toFixed(2) ?? 0.00}</Label>
          </div>
          <div className="flex justify-end p-4 gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange?.(false)}>Close</Button>
            <Button type="submit" disabled={isPending}>Save</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
