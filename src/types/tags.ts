import type z from "zod"
import type { tagSchema } from "./schemas/tag-schema"

export type Tag = z.infer<typeof tagSchema>
