import { z } from 'zod'
import { tagSchema } from '@/types/schemas/tag-schema'

export const splitTransactionSchema = z.object({
  id: z.number().nullable().optional(),
  transaction_id: z.number().nullable().optional(),
  amount: z.number(),
  description: z.string(),
  tag_id: z.number().nullable().optional(),
  tag: tagSchema.nullable().optional(),
})
