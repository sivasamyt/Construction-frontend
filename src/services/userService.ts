import api from './api'
import type { ApiResponse, PaginatedResponse, User } from '../types'

export interface UserFilters {
  search?: string
  role?: string
  page?: number
  per_page?: number
}

export const userService = {
  list: async (filters: UserFilters = {}) => {
    const { data } = await api.get<PaginatedResponse<User>>('/users', { params: filters })
    return data
  },

  get: async (id: number) => {
    const { data } = await api.get<ApiResponse<User>>(`/users/${id}`)
    return data
  },

  create: async (payload: Record<string, unknown>) => {
    const { data } = await api.post<ApiResponse<User>>('/users', payload)
    return data
  },

  update: async (id: number, payload: Record<string, unknown>) => {
    const { data } = await api.put<ApiResponse<User>>(`/users/${id}`, payload)
    return data
  },

  remove: async (id: number) => {
    const { data } = await api.delete<ApiResponse<null>>(`/users/${id}`)
    return data
  },

  assignRoles: async (id: number, roles: string[]) => {
    const { data } = await api.post<ApiResponse<User>>(`/users/${id}/roles`, { roles })
    return data
  },
}
