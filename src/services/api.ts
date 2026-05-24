import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  const tenantDomain = localStorage.getItem('tenant_domain')
  if (tenantDomain) {
    config.headers['X-Tenant-Domain'] = tenantDomain
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const tenantDomain = localStorage.getItem('tenant_domain')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('tenant_domain')
      const path = window.location.pathname
      if (!path.includes('/login')) {
        window.location.href = tenantDomain ? `/${tenantDomain}/login` : '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
