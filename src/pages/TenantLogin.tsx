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
import { tenantLogin } from '../store/authSlice'
import { useTenant } from '../context/TenantContext'

export default function TenantLogin() {
  const { tenant = '' } = useParams<{ tenant: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { company } = useTenant()
  const { loading, isAuthenticated, tenantDomain } = useAppSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated && tenantDomain === tenant) {
      navigate(`/${tenant}/dashboard`, { replace: true })
    }
  }, [isAuthenticated, tenantDomain, tenant, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = await dispatch(tenantLogin({ domain: tenant, email, password }))
    if (tenantLogin.fulfilled.match(result)) {
      navigate(`/${tenant}/dashboard`)
    } else {
      setError((result.payload as string) || 'Invalid credentials')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight={700}>
              {company?.name || 'Company'} Login
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Sign in to your company workspace
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
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
