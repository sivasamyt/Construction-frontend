import type { User } from '../types'

export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false
  return user.permissions?.includes(permission) ?? false
}

export const hasRole = (user: User | null, roles: string[]): boolean => {
  if (!user?.roles?.length) return false
  const userRoles = user.roles.map((r) => r.name)
  return roles.some((role) => userRoles.includes(role))
}

export const hasAnyAccess = (
  user: User | null,
  permission?: string,
  roles?: string[]
): boolean => {
  if (permission && hasPermission(user, permission)) return true
  if (roles?.length && hasRole(user, roles)) return true
  return !permission && !roles?.length
}
