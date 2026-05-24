import api from './api'
import type { ApiResponse, LoginPayload, User } from '../types'

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post<ApiResponse<{ user: User; token: string; token_type: string }>>(
      '/auth/login',
      payload
    )
    return data
  },

  logout: async () => {
    const { data } = await api.post<ApiResponse<null>>('/auth/logout')
    return data
  },

  me: async () => {
    const { data } = await api.get<ApiResponse<User>>('/auth/me')
    return data
  },
}
