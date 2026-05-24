import api from './api'
import type { ApiResponse, Company, DomainPreview, PaginatedResponse, RegisterCompanyPayload } from '../types'

export const companyService = {
  previewDomain: async (domain: string) => {
    const { data } = await api.get<ApiResponse<DomainPreview>>('/companies/preview-domain', {
      params: { domain },
    })
    return data
  },

  register: async (payload: RegisterCompanyPayload) => {
    const { data } = await api.post<
      ApiResponse<{ company: Company; domain: { domain: string; url: string }; url: string }>
    >('/companies/register', payload)
    return data
  },

  list: async (params?: { search?: string; page?: number; per_page?: number }) => {
    const { data } = await api.get<PaginatedResponse<Company>>('/companies', {
      params,
    })
    return data
  },

  show: async (id: number) => {
    const { data } = await api.get<ApiResponse<Company>>(`/companies/${id}`)
    return data
  },
}
