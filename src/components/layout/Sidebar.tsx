import type { ReactNode } from 'react'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SecurityIcon from '@mui/icons-material/Security'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import PersonIcon from '@mui/icons-material/Person'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { hasPermission } from '../../utils/permissions'
import type { MenuItem } from '../../types'

const drawerWidth = 260

const platformMenuItems: MenuItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: 'dashboard', permission: 'dashboard.view' },
  { label: 'Users', path: '/users', icon: 'people', permission: 'users.view' },
  { label: 'Roles', path: '/roles', icon: 'security', permission: 'roles.view' },
  { label: 'Permissions', path: '/permissions', icon: 'vpn_key', permission: 'permissions.view' },
  { label: 'Profile', path: '/profile', icon: 'person' },
]

const tenantMenuItems: MenuItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: 'dashboard', permission: 'dashboard.view' },
  { label: 'Company Users', path: '/users', icon: 'people', permission: 'company.users.view' },
  { label: 'Profile', path: '/profile', icon: 'person' },
]

const iconMap: Record<string, ReactNode> = {
  dashboard: <DashboardIcon />,
  people: <PeopleIcon />,
  security: <SecurityIcon />,
  vpn_key: <VpnKeyIcon />,
  person: <PersonIcon />,
}

interface SidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { user, tenantDomain } = useAppSelector((state) => state.auth)

  const base = tenantDomain ? `/${tenantDomain}` : ''
  const menuItems = tenantDomain ? tenantMenuItems : platformMenuItems

  const visibleItems = menuItems
    .filter((item) => !item.permission || hasPermission(user, item.permission))
    .map((item) => ({ ...item, path: `${base}${item.path}` }))

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {visibleItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={isMobile ? onClose : undefined}
            sx={{
              '&.active': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': { color: 'inherit' },
              },
            }}
          >
            <ListItemIcon>{iconMap[item.icon]}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </div>
  )

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      {drawer}
    </Drawer>
  )
}

export { drawerWidth }
