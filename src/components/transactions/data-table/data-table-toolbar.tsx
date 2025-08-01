import { XIcon } from 'lucide-react'
import type { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/transactions/data-table/data-table-view-options'
import { DataTableFacetedFilter } from '@/components/transactions/data-table/data-table-faceted-filter'
import { tagsFilterSchema } from '@/components/transactions/data-table/data/schema'
import type { Tag } from '@/types/tags'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  tags: Tag[]
}

export function DataTableToolbar<TData>({
  table,
  tags,
}: DataTableToolbarProps<TData>) {
  const tagsInfo = tagsFilterSchema.parse(tags)
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter..."
          value={
            (table.getColumn('description')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('description')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('category') && (
          <DataTableFacetedFilter
            column={table.getColumn('category')}
            title="Category"
            options={tagsInfo}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
