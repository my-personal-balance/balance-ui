import { z } from "zod"

export const tagSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  value: z.string()
})

export const tagsArraySchema = z.array(tagSchema)