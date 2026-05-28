export const PLATFORM_ROUTES = new Set([
  'login',
  'register-company',
  'dashboard',
  'users',
  'roles',
  'permissions',
  'profile',
  'unauthorized',
  'companies',
  'projects',
])

export function isPlatformRoute(segment: string): boolean {
  return PLATFORM_ROUTES.has(segment.toLowerCase())
}

export function getAppBaseUrl(): string {
  if (import.meta.env.VITE_APP_URL) {
    return import.meta.env.VITE_APP_URL.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return 'http://localhost:5173'
}

export function normalizeDomain(input: string): string {
  let slug = input.trim()
  if (!slug) return ''
  if (/\s/.test(slug)) {
    slug = slug.replace(/\s+/g, '-')
  }
  return slug.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '')
}

export function buildTenantUrl(domain: string): string {
  const slug = normalizeDomain(domain)
  if (!slug) return getAppBaseUrl()
  return `${getAppBaseUrl()}/${slug}`
}
