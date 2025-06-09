import axios from 'redaxios'
import type{ User } from '@/types/users'

export const getUser = async (accessToken?: string | null): Promise<User> => {
  return await axios.get<User>(
    'http://localhost:5000/users',
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
  ).then(res => res.data)
  .catch(() => {
    throw new Error(`Failed to request user`)
  })
}