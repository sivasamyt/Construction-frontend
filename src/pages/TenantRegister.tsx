import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { registerOwner } from '../store/authSlice'
import { useTenant } from '../context/TenantContext'

export default function TenantRegister() {
  const { tenant = '' } = useParams<{ tenant: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { company, hasOwner } = useTenant()
  const { loading, isAuthenticated, tenantDomain } = useAppSelector((state) => state.auth)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (hasOwner) {
      navigate(`/${tenant}/login`, { replace: true })
    }
  }, [hasOwner, tenant, navigate])

  useEffect(() => {
    if (isAuthenticated && tenantDomain === tenant) {
      navigate(`/${tenant}/dashboard`, { replace: true })
    }
  }, [isAuthenticated, tenantDomain, tenant, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = await dispatch(registerOwner({ domain: tenant, ...form }))
    if (registerOwner.fulfilled.match(result)) {
      navigate(`/${tenant}/dashboard`)
    } else {
      setError((result.payload as string) || 'Registration failed')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight={700}>
              Register as Owner
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Create the owner account for {company?.name}
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                margin="normal"
                value={form.password_confirmation}
                onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                required
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Owner Account'}
              </Button>
              <Button fullWidth component={RouterLink} to={`/${tenant}`} sx={{ mt: 1 }}>
                Back
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
