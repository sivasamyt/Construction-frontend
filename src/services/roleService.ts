import api from './api'
import type { ApiResponse, PaginatedResponse, Role } from '../types'

export const roleService = {
  list: async (params: Record<string, unknown> = {}) => {
    const { data } = await api.get<PaginatedResponse<Role>>('/roles', { params })
    return data
  },

  get: async (id: number) => {
    const { data } = await api.get<ApiResponse<Role>>(`/roles/${id}`)
    return data
  },

  create: async (payload: Record<string, unknown>) => {
    const { data } = await api.post<ApiResponse<Role>>('/roles', payload)
    return data
  },

  update: async (id: number, payload: Record<string, unknown>) => {
    const { data } = await api.put<ApiResponse<Role>>(`/roles/${id}`, payload)
    return data
  },

  remove: async (id: number) => {
    const { data } = await api.delete<ApiResponse<null>>(`/roles/${id}`)
    return data
  },

  syncPermissions: async (id: number, permissions: string[]) => {
    const { data } = await api.post<ApiResponse<Role>>(`/roles/${id}/permissions`, { permissions })
    return data
  },
}
