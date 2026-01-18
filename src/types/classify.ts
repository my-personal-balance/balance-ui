import type { Transaction } from "./transactions"

export type TransactionClassificationResponse = {
  id: number
  category: number
  confidence_level: number
}

export type ClassifiedTransaction = Transaction & {
  confidenceLevel?: number
}