import axios from 'redaxios'
import type { OAuthResponse } from '@/types/oauth'

export const authenticate = async (email: string, password: string): Promise<OAuthResponse> => {
  return await axios.post<OAuthResponse>(
    'http://localhost:5000/oauth2/token',
    {
      email,
      password,
    }
  ).then(res => res.data)
  .catch(() => {
    throw new Error(`Failed to authenticate user ${email}`)
  })
}