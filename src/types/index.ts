export interface Role {
  id: number
  name: string
  guard_name: string
  permissions?: Permission[]
}

export interface Permission {
  id: number
  name: string
  guard_name: string
}

export interface Domain {
  id: number
  domain: string
  url: string
  company_id?: number
}

export interface CompanyOwner {
  id: number
  name: string
  email: string
}

export interface Company {
  id: number
  name: string
  contact_number: string
  email: string
  address: string
  domain?: Domain
  owner?: CompanyOwner | null
  has_owner?: boolean
}

export interface User {
  id: number
  name: string
  email: string
  company_id?: number | null
  company?: Company
  tenant_domain?: string | null
  email_verified_at?: string | null
  roles?: Role[]
  permissions?: string[]
  created_at?: string
  updated_at?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  tenantDomain: string | null
  isAuthenticated: boolean
  loading: boolean
}

export interface Project {
  id: number
  company_id: number
  name: string
  description?: string | null
  status: string
  start_date?: string | null
  end_date?: string | null
  created_at?: string
  updated_at?: string
}

export interface RegisterCompanyPayload {
  name: string
  domain: string
  contact_number: string
  email: string
  address: string
}

export interface RegisterOwnerPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: T[]
  meta: PaginatedMeta
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
}

export interface LoginPayload {
  email: string
  password: string
  device_name?: string
}

export interface DomainPreview {
  domain: string
  available: boolean
}

export interface MenuItem {
  label: string
  path: string
  icon: string
  permission?: string
  roles?: string[]
}
