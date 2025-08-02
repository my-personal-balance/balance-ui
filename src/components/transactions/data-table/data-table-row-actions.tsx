import { EllipsisIcon, ListTreeIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type {
  DataTableRowActionsMultiProps,
  DataTableRowActionsProps,
} from '@/types/data-table'
import { useEditTransactions } from '@/hooks/use-transactions'
import { transactionSchema } from '@/components/transactions/data-table/data/schema'
import type { Transaction } from '@/types/transactions'

export function DataTableRowActions<TData>({
  row,
  setRowAction,
  tags,
  onChange,
}: DataTableRowActionsProps<TData>) {
  const transaction = row.original as Transaction
  const { asyncUpdateTransaction } = useEditTransactions()

  const handleSubmit = async (tagId: string) => {
    const newTransaction = transactionSchema.parse({
      account_id: transaction.account_id,
      amount: transaction.amount,
      date: transaction.date,
      description: transaction.description,
      id: transaction.id,
      transaction_type: transaction.transaction_type,
      tag_id: Number(tagId),
    })
    await asyncUpdateTransaction(transaction.id!, newTransaction)
    onChange?.()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <EllipsisIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => setRowAction({ row, variant: 'update' })}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setRowAction({ row, variant: 'split' })}
          >
            <ListTreeIcon className="h-4 w-4 mr-2" />
            Split
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="h-2/4 overflow-y-auto">
            <DropdownMenuRadioGroup
              value={transaction.tag?.id.toString()}
              onValueChange={value => handleSubmit(value)}
            >
              {tags.map(tag => (
                <DropdownMenuRadioItem key={tag.id} value={tag.id.toString()}>
                  {tag.value}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => setRowAction({ row, variant: 'delete' })}
        >
          <TrashIcon className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DataTableRowActionsMulti<TData>({
  rows,
  setRowAction,
}: DataTableRowActionsMultiProps<TData>) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <EllipsisIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() =>
                setRowAction({ rows, variant: 'update-multiple' })
              }
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setRowAction({ rows, variant: 'delete-multiple' })}
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
