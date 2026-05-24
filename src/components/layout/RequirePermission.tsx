import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { hasAnyAccess } from '../../utils/permissions'

interface RequirePermissionProps {
  permission?: string
  roles?: string[]
  children: React.ReactNode
}

export default function RequirePermission({ permission, roles, children }: RequirePermissionProps) {
  const { user } = useAppSelector((state) => state.auth)

  if (!hasAnyAccess(user, permission, roles)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
