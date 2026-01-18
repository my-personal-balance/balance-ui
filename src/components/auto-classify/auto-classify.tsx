import { useEffect, useState, useTransition as useTransitionReact } from 'react'
import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { Spinner } from '@/components/ui/spinner'
import { DatePickerWithRange } from '@/components/date-range-picker'

import type { TransactionFilterProps } from '@/types/transactions'
import { useTransactions, useEditTransactions } from '@/hooks/use-transactions'
import { ClassifyTable } from './classify-table/classify-table'
import { Button } from '../ui/button'
import { autoClassify } from '@/api/auto-classify'
import { useAuth } from '@/auth'
import { useTags } from '@/hooks/use-tags'
import type { ClassifiedTransaction } from '@/types/classify'
import { transactionSchema } from '@/types/schemas/transactions'

export function AutoClassify({
  title,
}: {
  title: string
  accountId?: number
}) {
  const auth = useAuth()
  const [filters, setFilters] = useState<TransactionFilterProps>({
    tagId: 0,
  })
  const [classifiedTransactions, setClassifiedTransactions] = useState<ClassifiedTransaction[]>([])

  const { transactions, refreshTransactions } = useTransactions()
  const { asyncPatchTransaction } = useEditTransactions()
  const { tags, getTagById } = useTags()
  const [isPending, startTransition] = useTransitionReact()
  
  const handleDateChange = (date: DateRange) => {
    const dateRange = date as DateRange
    if (dateRange?.from && dateRange?.to) {
      setFilters({
        ...filters,
        startDate: dateRange?.from
          ? format(dateRange.from, 'yyyy-MM-dd')
          : undefined,
        endDate: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
        periodType: 'custom',
      })
    }
  }

  useEffect(() => {
    refreshTransactions(filters)
  }, [filters])

  useEffect(() => {
    setClassifiedTransactions(transactions)
  }, [transactions])

  const triggerAutoClassify = async () => {
    const transactionIds: number[] = transactions.map(transaction => transaction.id ? transaction.id : 0)
    startTransition(async () => {
      const classificationResponse = await autoClassify(
        auth.accessToken,
        transactionIds
      )

      const newTransactions = transactions.map(transaction => 
        {
          const transactionClassificationResponse = classificationResponse.find(responseTransaction => responseTransaction.id === transaction.id)
          if (transactionClassificationResponse) {
            const tag = getTagById(transactionClassificationResponse.category)
            return {
              ...transaction,
              tag: tag,
              tag_id: transactionClassificationResponse.category,
              confidenceLevel: transactionClassificationResponse.confidence_level,
            }
          }
          return transaction
        }
      )
      setClassifiedTransactions(newTransactions)
    })
    
  }

  const handleRowAction = async (classifiedTransaction: ClassifiedTransaction) => {
    if (classifiedTransaction.tag_id) {
      
      const newTransaction = transactionSchema.parse({
        id: Number(classifiedTransaction.id),
        tag_id: Number(classifiedTransaction.tag_id),
      })
      await asyncPatchTransaction(classifiedTransaction.id!, newTransaction)     
    }
  }

  return (
    <>
      <div className="flex justify-between sm:grid sm:grid-cols-2">
        <div className="items-center space-y-2 px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          </div>
        </div>
        <div className="flex justify-end gap-2 sm:px-4 md:px-4 lg:px-6">
          <DatePickerWithRange
            onChange={date => date && handleDateChange(date as DateRange)}
          />
          <Button onClick={triggerAutoClassify} disabled={isPending}>
            {isPending && <Spinner />} Classify
          </Button>
        </div>
      </div>
      <div className="px-4 lg:px-6">
        <ClassifyTable data={classifiedTransactions} rowAction={handleRowAction} tags={tags} />
      </div>
    </>
  )
}
