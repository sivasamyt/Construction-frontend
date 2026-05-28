import api from './api'
import type { PaginatedResponse, Project } from '../types'

export const tenantProjectService = {
  list: async (
    domain: string,
    params?: { search?: string; status?: string; page?: number; per_page?: number }
  ) => {
    const { data } = await api.get<PaginatedResponse<Project>>(`/tenant/${domain}/projects`, {
      params,
    })
    return data
  },

  create: async (
    domain: string,
    payload: {
      name: string
      description?: string
      status?: string
      start_date?: string
      end_date?: string
    }
  ) => {
    const { data } = await api.post<{ success: boolean; message: string; data: Project }>(
      `/tenant/${domain}/projects`,
      payload
    )
    return data
  },

  update: async (
    domain: string,
    id: number,
    payload: Partial<{
      name: string
      description: string
      status: string
      start_date: string
      end_date: string
    }>
  ) => {
    const { data } = await api.put<{ success: boolean; message: string; data: Project }>(
      `/tenant/${domain}/projects/${id}`,
      payload
    )
    return data
  },

  delete: async (domain: string, id: number) => {
    const { data } = await api.delete<{ success: boolean; message: string }>(
      `/tenant/${domain}/projects/${id}`
    )
    return data
  },
}
