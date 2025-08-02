import { useEffect, useState } from 'react'
import { useAuth } from '@/auth'
import { listTags } from '@/api/tags'
import type { Tag } from '@/types/tags'

export const useTags = () => {
  const auth = useAuth()
  const [tags, setTags] = useState([] as Tag[])

  useEffect(() => {
    const fetchTags = async () => {
      const response = await listTags(auth.accessToken)
      setTags(response.tags)
    }
    fetchTags()
  }, [auth.accessToken])

  return {
    tags,
  }
}
