import { z } from "zod"
import { accountSchema } from "@/types/schemas/accounts-schema"
import { tagSchema, tagsArraySchema } from "@/types/schemas/tag-schema"
import { splitTransactionSchema } from "@/types/schemas/split-transaction-schema"

export const TransactionTypeEnum = z.enum(["EXPENSE", "INCOME", "TRANSFER", "REFUND", "INVESTMENT"]);

export const tagsFilterSchema = tagsArraySchema.transform((dataArray) => {
  return dataArray.map(data => ({
    value: data.id.toString(),
    label: data.value,
    icon: undefined,
  }));
});

export const transactionSchema = z.object({
  id: z.number().optional(),
  account: accountSchema.nullable().optional(),
  account_id: z.coerce.number().nullable().optional(),
  amount: z.number().nullable().optional(),
  balance: z.number().optional(),
  date: z.coerce.date().nullable().optional(),
  description: z.string().nullable().optional(),
  split_transactions: z.array(splitTransactionSchema).nullable().optional(),
  tag: tagSchema.nullable().optional(),
  tag_id: z.coerce.number().nullable().optional(),
  transaction_type: TransactionTypeEnum.nullable().optional(),
})
