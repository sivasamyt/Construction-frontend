import api from './api'
import type { PaginatedResponse, User } from '../types'

export const tenantUserService = {
  list: async (
    domain: string,
    params?: { search?: string; role?: string; page?: number; per_page?: number }
  ) => {
    const { data } = await api.get<PaginatedResponse<User>>(`/tenant/${domain}/users`, { params })
    return data
  },

  create: async (
    domain: string,
    payload: {
      name: string
      email: string
      password: string
      password_confirmation: string
      roles: string[]
    }
  ) => {
    const { data } = await api.post<{ success: boolean; message: string; data: User }>(
      `/tenant/${domain}/users`,
      payload
    )
    return data
  },

  update: async (
    domain: string,
    id: number,
    payload: Partial<{
      name: string
      email: string
      password: string
      password_confirmation: string
      roles: string[]
    }>
  ) => {
    const { data } = await api.put<{ success: boolean; message: string; data: User }>(
      `/tenant/${domain}/users/${id}`,
      payload
    )
    return data
  },

  delete: async (domain: string, id: number) => {
    const { data } = await api.delete<{ success: boolean; message: string }>(
      `/tenant/${domain}/users/${id}`
    )
    return data
  },
}
