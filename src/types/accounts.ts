import { z } from 'zod'
import type { accountSchema } from '@/types/schemas/accounts-schema'

export type Account = z.infer<typeof accountSchema>
