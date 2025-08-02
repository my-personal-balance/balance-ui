import axios from 'redaxios'
import type { Tag } from '@/types/tags'

type ListTagsReponse = {
  tags: Tag[]
}

export const listTags = async (
  accessToken: string | null
): Promise<ListTagsReponse> => {
  return await axios
    .get<ListTagsReponse>('http://localhost:5000/tags', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data)
    .catch(() => {
      throw new Error(`Failed to request user`)
    })
}
