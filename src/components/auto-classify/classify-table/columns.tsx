import type { ColumnDef, Row } from '@tanstack/react-table'

import { ArrowLeftRight, Check } from 'lucide-react'
import { formatNumber } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Account } from '@/types/accounts'
import type { ClassifiedTransaction } from '@/types/classify'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import type { Tag } from '@/types/tags'

export function getClassifyTableColumns(
  onChange: (row: ClassifiedTransaction) => void,
  tags: Tag[]
): ColumnDef<ClassifiedTransaction, any>[] {
  return [
    {
      accessorKey: 'date',
      header: () => (
        <div>Date</div>
      ),
      cell: ({ row }) => (
        <div className="w-[100px]">{row.getValue('date')}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'amount',
      header: () => (
        <div>Amount</div>
      ),
      cell: ({ row }) => {
        let signal = null
        switch (row.original.transaction_type) {
          case 'INCOME':
            signal = '+'
            break
          case 'TRANSFER':
            signal = <ArrowLeftRight width={15} />
            break
          default:
            signal = '-'
        }

        return (
          <div className="w-[90px]">
            {signal}{' '}
            {formatNumber(row.getValue('amount'), {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: 'description',
      header: () => (
        <div>Description</div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="font-medium">
              {row.getValue('description')}
            </span>
          </div>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: 'category',
      header: () => (
        <div>Category</div>
      ),
      cell: ({ row }) => {
        const tag = row.original.tag

        return (
          <div className="flex space-x-2">
            <span className="max-w-[160px] truncate font-medium">
              {tag && <Badge variant="outline">{tag.value}</Badge>}
            </span>
          </div>
        )
      },
      filterFn: (row, _id, value) => {
        return value.includes(row.original.tag_id?.toString() ?? '')
      },
      enableSorting: false,
    },
    {
      accessorKey: 'confidenceLevel',
      header: () => (
        <div>Confidence</div>
      ),
      cell: ({ row }) => {
        const confidenceLevel = row.original.confidenceLevel
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {confidenceLevel && confidenceLevel.toFixed(2)}
            </span>
          </div>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: 'account',
      header: () => (
        <div>Account</div>
      ),
      cell: ({ row }) => {
        const account = row.getValue('account') as Account
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {account && account.alias}
            </span>
          </div>
        )
      },
      enableSorting: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropDownMenu row={row} tags={tags} onChange={onChange} />
      ),
    },
  ]
}

function DropDownMenu({ row, tags, onChange }: 
  { 
    row: Row<ClassifiedTransaction>, 
    tags: Tag[], 
    onChange: (row: ClassifiedTransaction) => void 
  }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Submit">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="h-2/4 overflow-y-auto">
            <DropdownMenuRadioGroup
              value={row.original.tag?.id.toString()}
              onValueChange={value => row.original.tag_id = Number(value)}
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
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => onChange(row.original)}
          >
            Apply
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}