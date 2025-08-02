import type { Row } from '@tanstack/react-table'
import type { Tag } from '@/types/tags'

export interface DataTableRowAction<TData> {
  row?: Row<TData>
  rows?: Row<TData>[]
  variant: 'update' | 'delete' | 'update-multiple' | 'delete-multiple' | 'split'
}

export interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  setRowAction: (rowAction: DataTableRowAction<TData>) => void
  tags: Tag[]
  onChange?: () => void
}

export interface DataTableRowActionsMultiProps<TData> {
  rows: Row<TData>[]
  setRowAction: (rowAction: DataTableRowAction<TData>) => void
}
