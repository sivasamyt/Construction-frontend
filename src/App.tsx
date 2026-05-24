import { useEffect } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme/theme'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchMe } from './store/authSlice'
import { TenantProvider } from './context/TenantContext'
import PlatformProtectedRoute from './components/layout/PlatformProtectedRoute'
import TenantProtectedRoute from './components/layout/TenantProtectedRoute'
import RequirePermission from './components/layout/RequirePermission'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import RegisterCompany from './pages/RegisterCompany'
import Login from './pages/Login'
import Companies from './pages/Companies'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Roles from './pages/Roles'
import Permissions from './pages/Permissions'
import Profile from './pages/Profile'
import Unauthorized from './pages/Unauthorized'
import CompanyLanding from './pages/CompanyLanding'
import TenantLogin from './pages/TenantLogin'
import TenantRegister from './pages/TenantRegister'
import TenantUsers from './pages/TenantUsers'
import { isPlatformRoute } from './utils/tenant'

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const { token, user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchMe())
    }
  }, [dispatch, token, user])

  return <>{children}</>
}

function TenantRouteGuard() {
  const { tenant = '' } = useParams<{ tenant: string }>()
  if (!tenant || isPlatformRoute(tenant)) {
    return <Navigate to="/" replace />
  }
  return (
    <TenantProvider>
      <Outlet />
    </TenantProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthBootstrap>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-company" element={<RegisterCompany />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route element={<PlatformProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route
                  path="/dashboard"
                  element={
                    <RequirePermission permission="dashboard.view">
                      <Dashboard />
                    </RequirePermission>
                  }
                />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/companies"
                  element={
                    <RequirePermission roles={['super_admin']}>
                      <Companies />
                    </RequirePermission>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <RequirePermission permission="users.view">
                      <Users />
                    </RequirePermission>
                  }
                />
                <Route
                  path="/roles"
                  element={
                    <RequirePermission permission="roles.view">
                      <Roles />
                    </RequirePermission>
                  }
                />
                <Route
                  path="/permissions"
                  element={
                    <RequirePermission permission="permissions.view">
                      <Permissions />
                    </RequirePermission>
                  }
                />
              </Route>
            </Route>

            <Route path="/:tenant" element={<TenantRouteGuard />}>
              <Route index element={<CompanyLanding />} />
              <Route path="login" element={<TenantLogin />} />
              <Route path="register" element={<TenantRegister />} />
              <Route element={<TenantProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route
                    path="dashboard"
                    element={
                      <RequirePermission permission="dashboard.view">
                        <Dashboard />
                      </RequirePermission>
                    }
                  />
                  <Route path="profile" element={<Profile />} />
                  <Route
                    path="users"
                    element={
                      <RequirePermission permission="company.users.view">
                        <TenantUsers />
                      </RequirePermission>
                    }
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </AuthBootstrap>
      </BrowserRouter>
    </ThemeProvider>
  )
}
