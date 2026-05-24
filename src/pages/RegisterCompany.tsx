import { useEffect, useMemo, useState } from 'react'
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
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { companyService } from '../services/companyService'
import { buildTenantUrl, normalizeDomain } from '../utils/tenant'

export default function RegisterCompany() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    domain: '',
    contact_number: '',
    email: '',
    address: '',
  })
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null)
  const [checkingDomain, setCheckingDomain] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const normalizedDomain = useMemo(() => normalizeDomain(form.domain), [form.domain])
  const previewUrl = useMemo(
    () => (normalizedDomain ? buildTenantUrl(normalizedDomain) : ''),
    [normalizedDomain]
  )

  useEffect(() => {
    if (!normalizedDomain) {
      setDomainAvailable(null)
      return
    }

    const timer = setTimeout(async () => {
      setCheckingDomain(true)
      try {
        const res = await companyService.previewDomain(normalizedDomain)
        setDomainAvailable(res.data.available)
        if (res.data.domain && res.data.domain !== normalizedDomain) {
          setDomainAvailable(false)
        }
      } catch {
        setDomainAvailable(null)
      } finally {
        setCheckingDomain(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [normalizedDomain])

  const handleDomainChange = (value: string) => {
    setForm({ ...form, domain: value })
    setDomainAvailable(null)
  }

  const handleDomainBlur = () => {
    if (form.domain.trim()) {
      setForm({ ...form, domain: normalizedDomain })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!normalizedDomain) {
      setError('Please enter a valid domain.')
      return
    }
    if (domainAvailable === false) {
      setError('This domain is already taken.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await companyService.register({
        ...form,
        domain: normalizedDomain,
      })
      const tenantUrl = buildTenantUrl(res.data.domain.domain)
      setSuccess(`Company registered! Visit ${tenantUrl}`)
      setTimeout(() => navigate(`/${res.data.domain.domain}`), 1500)
    } catch (err: unknown) {
      const apiErr = err as {
        response?: { data?: { message?: string; errors?: Record<string, string[]> } }
      }
      const errors = apiErr.response?.data?.errors
      const firstError = errors ? Object.values(errors).flat()[0] : undefined
      setError(firstError || apiErr.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const domainHelperText = () => {
    if (!form.domain.trim()) {
      return 'Choose a unique subdomain for your company portal'
    }
    if (checkingDomain) return 'Checking availability...'
    if (!normalizedDomain) return 'Use lowercase letters, numbers, and hyphens only'
    if (domainAvailable === true) return 'Domain is available'
    if (domainAvailable === false) return 'This domain is already taken'
    return `Your portal will be at ${previewUrl}`
  }

  return (
    <Container maxWidth="sm">
      <Box minHeight="100vh" display="flex" alignItems="center" py={4}>
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight={700}>
              Register Company
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Create your company workspace and choose a custom domain URL.
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Company Name"
                margin="normal"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Contact Number"
                margin="normal"
                value={form.contact_number}
                onChange={(e) => setForm({ ...form, contact_number: e.target.value })}
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
                label="Address"
                margin="normal"
                multiline
                minRows={2}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                required
              />
               <TextField
                fullWidth
                label="Domain"
                margin="normal"
                value={form.domain}
                onChange={(e) => handleDomainChange(e.target.value)}
                onBlur={handleDomainBlur}
                required
                placeholder="casagrand or casa-grand"
                helperText={domainHelperText()}
                error={domainAvailable === false}
              />
              <TextField
                fullWidth
                label="Company URL"
                margin="normal"
                value={previewUrl}
                disabled
                helperText="Uses your current app URL (e.g. Vite dev server)"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
                disabled={loading || checkingDomain || domainAvailable === false || !normalizedDomain}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register Company'}
              </Button>
              <Button fullWidth component={RouterLink} to="/" sx={{ mt: 1 }}>
                Back to Home
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
