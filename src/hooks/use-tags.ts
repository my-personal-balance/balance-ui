import { useState, useEffect } from 'react'

import { listTags } from '@/api/tags'
import type { Tag } from '@/types/tags'
import { useAuth } from '@/auth'

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
