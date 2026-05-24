import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tenantAuthService } from '../services/tenantAuthService'
import type { Company } from '../types'

interface TenantContextValue {
  domain: string
  company: Company | null
  hasOwner: boolean
  loading: boolean
  error: string
  refresh: () => Promise<void>
}

const TenantContext = createContext<TenantContextValue | null>(null)

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const { tenant = '' } = useParams<{ tenant: string }>()
  const [company, setCompany] = useState<Company | null>(null)
  const [hasOwner, setHasOwner] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    if (!tenant) return
    setLoading(true)
    setError('')
    try {
      const res = await tenantAuthService.resolve(tenant)
      setCompany(res.data.company as Company)
      setHasOwner(res.data.has_owner)
    } catch {
      setError('Company not found')
      setCompany(null)
    } finally {
      setLoading(false)
    }
  }, [tenant])

  useEffect(() => {
    refresh()
  }, [refresh])

  const value = useMemo(
    () => ({ domain: tenant, company, hasOwner, loading, error, refresh }),
    [tenant, company, hasOwner, loading, error, refresh]
  )

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}

export function useTenant() {
  const ctx = useContext(TenantContext)
  if (!ctx) {
    throw new Error('useTenant must be used within TenantProvider')
  }
  return ctx
}
