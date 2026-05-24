import { useState } from 'react'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Chip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import { Outlet } from 'react-router-dom'
import Sidebar, { drawerWidth } from './Sidebar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/authSlice'

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { user, tenantDomain } = useAppSelector((state) => state.auth)

  const handleLogout = async () => {
    await dispatch(logout())
    if (tenantDomain) {
      window.location.href = `/${tenantDomain}`
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {tenantDomain ? `${user?.company?.name || 'Company'} Portal` : 'RBAC Enterprise Portal'}
          </Typography>
          {user?.roles?.[0] && (
            <Chip label={user.roles[0].name} size="small" sx={{ mr: 2, color: 'white' }} />
          )}
          <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
            {user?.name}
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
