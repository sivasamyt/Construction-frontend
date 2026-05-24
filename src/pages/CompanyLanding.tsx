// import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material'
// import { Link as RouterLink } from 'react-router-dom'
// import { useTenant } from '../context/TenantContext'
// import { buildTenantUrl } from '../utils/tenant'

// export default function CompanyLanding() {
//   const { domain, company, hasOwner, loading, error } = useTenant()

//   if (loading) {
//     return (
//       <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
//         <CircularProgress />
//       </Box>
//     )
//   }

//   if (error || !company) {
//     return (
//       <Container maxWidth="sm">
//         <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
//           <Typography color="error">{error || 'Company not found'}</Typography>
//         </Box>
//       </Container>
//     )
//   }

//   return (
//     <Container maxWidth="md">
//       <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
//         <Typography variant="h3" fontWeight={700} gutterBottom textAlign="center">
//           {company.name}
//         </Typography>
//         <Typography color="text.secondary" mb={1} textAlign="center">
//           {buildTenantUrl(domain)}
//         </Typography>
//         <Typography color="text.secondary" mb={4} textAlign="center">
//           Welcome to your company portal
//         </Typography>
//         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//           {!hasOwner && (
//             <Button component={RouterLink} to={`/${domain}/register`} variant="contained" size="large">
//               Register as Owner
//             </Button>
//           )}
//           <Button component={RouterLink} to={`/${domain}/login`} variant={hasOwner ? 'contained' : 'outlined'} size="large">
//             Login
//           </Button>
//         </Stack>
//       </Box>
//     </Container>
//   )
// }


import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import ApartmentIcon from '@mui/icons-material/Apartment'
import EngineeringIcon from '@mui/icons-material/Engineering'
import GroupsIcon from '@mui/icons-material/Groups'
import SecurityIcon from '@mui/icons-material/Security'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Link as RouterLink } from 'react-router-dom'
import { useTenant } from '../context/TenantContext'
import { buildTenantUrl } from '../utils/tenant'

export default function CompanyLanding() {
  const { domain, company, hasOwner, loading, error } = useTenant()

  const features = [
    {
      title: 'Project Management',
      description:
        'Track construction projects, workflows, and engineering operations efficiently.',
      icon: <EngineeringIcon sx={{ fontSize: 42 }} />,
    },
    {
      title: 'Team Collaboration',
      description:
        'Manage managers, engineers, and employees with secure role access.',
      icon: <GroupsIcon sx={{ fontSize: 42 }} />,
    },
    {
      title: 'Secure ERP Platform',
      description:
        'Enterprise-grade role permissions with multi-tenant company architecture.',
      icon: <SecurityIcon sx={{ fontSize: 42 }} />,
    },
  ]

  if (loading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)',
        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    )
  }

  if (error || !company) {
    return (
      <Container maxWidth="sm">
        <Box
          minHeight="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography color="error">
            {error || 'Company not found'}
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #eff6ff 0%, #f8fbff 50%, #ffffff 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="xl">
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{
            minHeight: '100vh',
            py: 8,
          }}
        >
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
              <Box
                sx={{
                  width: 65,
                  height: 65,
                  borderRadius: 4,
                  background:
                    'linear-gradient(135deg,#2563eb 0%,#3b82f6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 15px 35px rgba(37,99,235,0.35)',
                }}
              >
                <ApartmentIcon
                  sx={{
                    color: 'white',
                    fontSize: 34,
                  }}
                />
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  fontWeight={800}
                  lineHeight={1.1}
                >
                  {company.name}
                </Typography>

                <Typography
                  color="primary"
                  fontWeight={600}
                >
                  Construction ERP Portal
                </Typography>
              </Box>
            </Stack>

            <Typography
              variant="h6"
              color="text.secondary"
              lineHeight={1.9}
              mb={4}
            >
              Welcome to your company workspace. Manage engineering teams,
              employee access, construction workflows, and business operations
              from one powerful ERP platform.
            </Typography>

            {/* URL Box */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 4,
                bgcolor: 'white',
                border: '1px solid #dbeafe',
                mb: 4,
                boxShadow: '0 10px 30px rgba(37,99,235,0.08)',
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                mb={1}
              >
                Company Portal URL
              </Typography>

              <Typography
                fontWeight={700}
                color="primary"
              >
                {buildTenantUrl(domain)}
              </Typography>
            </Box>

            {/* Feature Points */}
            <Stack spacing={2} mb={5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <CheckCircleIcon sx={{ color: '#2563eb' }} />
                <Typography>
                  Dedicated company workspace
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <CheckCircleIcon sx={{ color: '#2563eb' }} />
                <Typography>
                  Role-based secure access
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <CheckCircleIcon sx={{ color: '#2563eb' }} />
                <Typography>
                  Smart engineering workflow management
                </Typography>
              </Stack>
            </Stack>

            {/* Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
            >
              {!hasOwner && (
                <Button
                  component={RouterLink}
                  to={`/${domain}/register`}
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 5,
                    py: 1.7,
                    borderRadius: 5,
                    textTransform: 'none',
                    fontWeight: 700,
                    background:
                      'linear-gradient(135deg,#2563eb 0%,#3b82f6 100%)',
                    boxShadow:
                      '0 14px 40px rgba(37,99,235,0.35)',
                  }}
                >
                  Register as Owner
                </Button>
              )}

              <Button
                component={RouterLink}
                to={`/${domain}/login`}
                variant={hasOwner ? 'contained' : 'outlined'}
                size="large"
                sx={{
                  px: 5,
                  py: 1.7,
                  borderRadius: 5,
                  textTransform: 'none',
                  fontWeight: 700,
                  borderWidth: 2,
                }}
              >
                Login to Portal
              </Button>
            </Stack>

            <Typography
              mt={5}
              color="text.secondary"
              sx={{
                fontStyle: 'italic',
              }}
            >
              “Building stronger projects through smarter digital management.”
            </Typography>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              {/* Main Image */}
              <Box
                sx={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.18)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1400&auto=format&fit=crop"
                  alt="Construction Company"
                  style={{
                    width: '100%',
                    height: '700px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(15,23,42,0.88), rgba(15,23,42,0.15))',
                  }}
                />

                {/* Overlay Content */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: 40,
                    right: 40,
                    color: 'white',
                  }}
                >
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    mb={2}
                  >
                    Build Better.
                    <br />
                    Manage Faster.
                  </Typography>

                  <Typography
                    lineHeight={1.9}
                    sx={{
                      opacity: 0.9,
                    }}
                  >
                    Modern ERP platform designed for construction companies to
                    manage teams, operations, engineering workflows, and secure
                    business growth.
                  </Typography>
                </Box>
              </Box>

              {/* Floating Stats Card */}
              <Card
                sx={{
                  position: 'absolute',
                  bottom: -40,
                  left: -30,
                  width: 300,
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    mb={1}
                  >
                    Smart Construction ERP
                  </Typography>

                  <Typography
                    color="text.secondary"
                    lineHeight={1.8}
                    mb={3}
                  >
                    Simplify company operations with role-based workflows and
                    secure tenant management.
                  </Typography>

                  <Stack direction="row" spacing={3}>
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        color="primary"
                      >
                        24/7
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Access
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        color="primary"
                      >
                        100%
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Secure
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        color="primary"
                      >
                        ERP
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Ready
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container
        maxWidth="lg"
        sx={{
          py: 12,
        }}
      >
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={800}
          mb={2}
        >
          Platform Features
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={8}
          sx={{
            maxWidth: 700,
            mx: 'auto',
            lineHeight: 1.8,
          }}
        >
          Everything your company needs to manage engineering operations,
          employees, permissions, and workflows efficiently.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 7,
                  height: '100%',
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid #e2e8f0',
                  transition: '0.35s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  <Box
                    sx={{
                      width: 85,
                      height: 85,
                      borderRadius: 5,
                      background:
                        'linear-gradient(135deg,#2563eb 0%,#3b82f6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      mb: 4,
                      boxShadow:
                        '0 15px 35px rgba(37,99,235,0.25)',
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={2}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    lineHeight={1.9}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}