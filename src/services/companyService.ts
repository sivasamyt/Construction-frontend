import api from './api'
import type { ApiResponse, Company, DomainPreview, RegisterCompanyPayload } from '../types'

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
}
