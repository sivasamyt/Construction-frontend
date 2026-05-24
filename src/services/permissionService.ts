import api from './api'
import type { ApiResponse, PaginatedResponse, Permission } from '../types'

export const permissionService = {
  list: async (params: Record<string, unknown> = {}) => {
    const { data } = await api.get<PaginatedResponse<Permission>>('/permissions', { params })
    return data
  },

  create: async (payload: Record<string, unknown>) => {
    const { data } = await api.post<ApiResponse<Permission>>('/permissions', payload)
    return data
  },

  update: async (id: number, payload: Record<string, unknown>) => {
    const { data } = await api.put<ApiResponse<Permission>>(`/permissions/${id}`, payload)
    return data
  },

  remove: async (id: number) => {
    const { data } = await api.delete<ApiResponse<null>>(`/permissions/${id}`)
    return data
  },
}
