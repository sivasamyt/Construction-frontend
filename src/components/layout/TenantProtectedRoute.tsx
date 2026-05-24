import { Navigate, Outlet, useParams } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import { useAppSelector } from '../../store/hooks'

export default function TenantProtectedRoute() {
  const { tenant } = useParams<{ tenant: string }>()
  const { isAuthenticated, loading, tenantDomain } = useAppSelector((state) => state.auth)

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated || tenantDomain !== tenant) {
    return <Navigate to={`/${tenant}/login`} replace />
  }

  return <Outlet />
}
