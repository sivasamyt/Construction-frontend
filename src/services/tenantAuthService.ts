import api from './api'
import type { ApiResponse, LoginPayload, RegisterOwnerPayload, User } from '../types'

export const tenantAuthService = {
  resolve: async (domain: string) => {
    const { data } = await api.get<
      ApiResponse<{ company: { name: string; email: string }; domain: string; has_owner: boolean }>
    >(`/tenant/${domain}`)
    console.log(data);
    
    return data
  },

  login: async (domain: string, payload: LoginPayload) => {
    const { data } = await api.post<
      ApiResponse<{ user: User; token: string; token_type: string; domain: string }>
    >(`/tenant/${domain}/auth/login`, payload)
    return data
  },

  registerOwner: async (domain: string, payload: RegisterOwnerPayload) => {
    const { data } = await api.post<
      ApiResponse<{ user: User; token: string; token_type: string; domain: string }>
    >(`/tenant/${domain}/auth/register-owner`, payload)
    return data
  },

  logout: async (domain: string) => {
    const { data } = await api.post<ApiResponse<null>>(`/tenant/${domain}/auth/logout`)
    return data
  },

  me: async (domain: string) => {
    const { data } = await api.get<ApiResponse<User>>(`/tenant/${domain}/auth/me`)
    return data
  },
}
