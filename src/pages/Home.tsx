// import { Box, Button, Container, Stack, Typography } from '@mui/material'
// import { Link as RouterLink } from 'react-router-dom'

// export default function Home() {
//   return (
//     <Container maxWidth="md">
//       <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
//         <Typography variant="h3" fontWeight={700} gutterBottom textAlign="center">
//           Construction Platform
//         </Typography>
//         <Typography color="text.secondary" mb={4} textAlign="center">
//           Multi-tenant company management with role-based access control
//         </Typography>
//         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//           <Button component={RouterLink} to="/register-company" variant="contained" size="large">
//             Register Company
//           </Button>
//           <Button component={RouterLink} to="/login" variant="outlined" size="large">
//             Platform Login
//           </Button>
//         </Stack>
//         <Typography variant="body2" color="text.secondary" mt={4} textAlign="center">
//           Platform login is for super administrators and platform admins only.
//         </Typography>
//       </Box>
//     </Container>
//   )
// }
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   Stack,
//   Toolbar,
//   Typography,
// } from '@mui/material'
// import EngineeringIcon from '@mui/icons-material/Engineering'
// import ApartmentIcon from '@mui/icons-material/Apartment'
// import SecurityIcon from '@mui/icons-material/Security'
// import GroupsIcon from '@mui/icons-material/Groups'
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
// import { Link as RouterLink } from 'react-router-dom'

// export default function Home() {
//   const features = [
//     {
//       title: 'Company Management',
//       description: 'Manage multiple construction companies with dedicated workspaces.',
//       icon: <ApartmentIcon sx={{ fontSize: 40 }} />,
//     },
//     {
//       title: 'Role-Based Access',
//       description: 'Secure access for owners, managers, engineers, and employees.',
//       icon: <SecurityIcon sx={{ fontSize: 40 }} />,
//     },
//     {
//       title: 'Team Collaboration',
//       description: 'Organize teams, projects, and workflows efficiently.',
//       icon: <GroupsIcon sx={{ fontSize: 40 }} />,
//     },
//   ]

//   return (
//     <Box sx={{ bgcolor: '#f5f7fb', minHeight: '100vh' }}>
      
//       {/* Header */}
//       <AppBar
//         position="static"
//         elevation={0}
//         sx={{
//           bgcolor: 'white',
//           borderBottom: '1px solid #e5e7eb',
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
//             <Stack direction="row" spacing={1} alignItems="center">
//               <EngineeringIcon sx={{ color: '#1976d2', fontSize: 32 }} />
//               <Typography variant="h6" fontWeight={700} color="black">
//                 BuildFlow
//               </Typography>
//             </Stack>

//             <Stack direction="row" spacing={2}>
//               <Button
//                 component={RouterLink}
//                 to="/login"
//                 variant="outlined"
//               >
//                 Platform Login
//               </Button>

//               <Button
//                 component={RouterLink}
//                 to="/register-company"
//                 variant="contained"
//               >
//                 Register Company
//               </Button>
//             </Stack>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Hero Section */}
//       <Container maxWidth="xl">
//         <Grid
//           container
//           spacing={6}
//           alignItems="center"
//           sx={{ minHeight: '85vh' }}
//         >
//           {/* Left */}
//           <Grid item xs={12} md={6}>
//             <Typography
//               variant="h2"
//               fontWeight={800}
//               lineHeight={1.2}
//               mb={3}
//             >
//               Simplify Construction Company Management
//             </Typography>

//             <Typography
//               variant="h6"
//               color="text.secondary"
//               lineHeight={1.8}
//               mb={4}
//             >
//               Manage companies, teams, engineers, projects, and permissions
//               with a powerful multi-tenant platform designed for modern
//               construction businesses.
//             </Typography>

//             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//               <Button
//                 component={RouterLink}
//                 to="/register-company"
//                 variant="contained"
//                 size="large"
//                 endIcon={<ArrowForwardIcon />}
//                 sx={{
//                   px: 4,
//                   py: 1.5,
//                   borderRadius: 3,
//                 }}
//               >
//                 Get Started
//               </Button>

//               <Button
//                 component={RouterLink}
//                 to="/login"
//                 variant="outlined"
//                 size="large"
//                 sx={{
//                   px: 4,
//                   py: 1.5,
//                   borderRadius: 3,
//                 }}
//               >
//                 Platform Login
//               </Button>
//             </Stack>

//             <Typography
//               variant="body1"
//               color="text.secondary"
//               mt={5}
//               sx={{
//                 fontStyle: 'italic',
//               }}
//             >
//               “Building smarter teams starts with smarter management.”
//             </Typography>
//           </Grid>

//           {/* Right */}
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 position: 'relative',
//                 height: 300,
//                 borderRadius: 6,
//                 overflow: 'hidden',
//                 background:
//                   'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 boxShadow: '0 20px 60px rgba(25,118,210,0.25)',
//               }}
//             >
//               <Box textAlign="center" color="white" px={4}>
//                 <EngineeringIcon sx={{ fontSize: 90, mb: 2 }} />

//                 <Typography variant="h4" fontWeight={700} mb={2}>
//                   Multi-Tenant Construction ERP
//                 </Typography>

//                 <Typography variant="body1" lineHeight={2}>
//                   One platform for company onboarding, employee management,
//                   engineering workflows, secure access control, and scalable
//                   business operations.
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>

//       {/* Features */}
//       <Container maxWidth="lg" sx={{ pb: 10 }}>
//         <Typography
//           variant="h4"
//           fontWeight={700}
//           textAlign="center"
//           mb={6}
//         >
//           Why Choose BuildFlow?
//         </Typography>

//         <Grid container spacing={4}>
//           {features.map((feature, index) => (
//             <Grid item xs={12} md={4} key={index}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   borderRadius: 5,
//                   height: '100%',
//                   border: '1px solid #e5e7eb',
//                   transition: '0.3s',
//                   '&:hover': {
//                     transform: 'translateY(-6px)',
//                     boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
//                   },
//                 }}
//               >
//                 <CardContent sx={{ p: 4 }}>
//                   <Box
//                     sx={{
//                       width: 70,
//                       height: 70,
//                       borderRadius: 3,
//                       bgcolor: '#e3f2fd',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: '#1976d2',
//                       mb: 3,
//                     }}
//                   >
//                     {feature.icon}
//                   </Box>

//                   <Typography variant="h6" fontWeight={700} mb={2}>
//                     {feature.title}
//                   </Typography>

//                   <Typography color="text.secondary" lineHeight={1.8}>
//                     {feature.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   )
// }

import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import EngineeringIcon from '@mui/icons-material/Engineering'
import BusinessIcon from '@mui/icons-material/Business'
import ApartmentIcon from '@mui/icons-material/Apartment'
import SecurityIcon from '@mui/icons-material/Security'
import GroupsIcon from '@mui/icons-material/Groups'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Link as RouterLink } from 'react-router-dom'

export default function Home() {
  const features = [
    {
      title: 'Multi Company Management',
      description:
        'Create and manage multiple construction companies with dedicated workspaces and domains.',
      icon: <ApartmentIcon sx={{ fontSize: 42 }} />,
    },
    {
      title: 'Secure Role Access',
      description:
        'Role-based access control for owners, managers, engineers, and employees.',
      icon: <SecurityIcon sx={{ fontSize: 42 }} />,
    },
    {
      title: 'Team Collaboration',
      description:
        'Manage engineering teams, tasks, and workflows from one centralized platform.',
      icon: <GroupsIcon sx={{ fontSize: 42 }} />,
    },
  ]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(to bottom right, #f5f7ff 0%, #eef4ff 50%, #ffffff 100%)',
      }}
    >
      {/* Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between',
              py: 1,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 45,
                  height: 45,
                  borderRadius: 3,
                  background:
                    'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(25,118,210,0.35)',
                }}
              >
                <EngineeringIcon sx={{ color: 'white' }} />
              </Box>

              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  background:
                    'linear-gradient(90deg,#1976d2,#42a5f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                BuildFlow ERP
              </Typography>
            </Stack>

            <Button
              component={RouterLink}
              to="/register-company"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.3,
                borderRadius: 4,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                background:
                  'linear-gradient(135deg,#1976d2 0%, #42a5f5 100%)',
                boxShadow: '0 12px 30px rgba(25,118,210,0.35)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 16px 35px rgba(25,118,210,0.4)',
                },
              }}
            >
              Register Company
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="xl">
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{
            minHeight: '92vh',
          }}
        >
          {/* Left */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              fontWeight={900}
              lineHeight={1.1}
              sx={{
                fontSize: {
                  xs: '3rem',
                  md: '4.8rem',
                },
                mb: 3,
              }}
            >
              Smart ERP for
              <Box
                component="span"
                sx={{
                  display: 'block',
                  background:
                    'linear-gradient(90deg,#1976d2,#42a5f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Construction Companies
              </Box>
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              lineHeight={1.9}
              mb={4}
              sx={{
                maxWidth: 650,
              }}
            >
              Streamline your company operations with a modern
              multi-tenant ERP platform for construction businesses.
              Manage employees, engineering teams, permissions,
              projects, and company workflows from one centralized system.
            </Typography>

            <Stack spacing={2} mb={5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <CheckCircleIcon sx={{ color: '#1976d2' }} />
                <Typography>
                  Company-based multi-tenant architecture
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <CheckCircleIcon sx={{ color: '#1976d2' }} />
                <Typography>
                  Role & permission based secure access
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <CheckCircleIcon sx={{ color: '#1976d2' }} />
                <Typography>
                  Dedicated company domains and dashboards
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
            >
              <Button
                component={RouterLink}
                to="/register-company"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 5,
                  py: 1.7,
                  borderRadius: 5,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 700,
                  background:
                    'linear-gradient(135deg,#1976d2 0%, #42a5f5 100%)',
                  boxShadow: '0 14px 40px rgba(25,118,210,0.35)',
                }}
              >
                Get Started
              </Button>
            </Stack>

            <Typography
              mt={5}
              color="text.secondary"
              sx={{
                fontStyle: 'italic',
                fontSize: '1rem',
              }}
            >
              “Building stronger companies through smarter digital solutions.”
            </Typography>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              {/* Main Image Card */}
              <Box
                sx={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
                  position: 'relative',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
                  alt="Construction ERP"
                  style={{
                    width: '100%',
                    height: '650px',
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
                      'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1))',
                  }}
                />

                {/* Overlay Content */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: 40,
                    color: 'white',
                  }}
                >
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    mb={2}
                  >
                    Build Faster.
                    <br />
                    Manage Smarter.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      maxWidth: 420,
                      opacity: 0.9,
                      lineHeight: 1.9,
                    }}
                  >
                    Modern ERP software designed for construction
                    companies to manage operations, employees,
                    engineering workflows, and growth.
                  </Typography>
                </Box>
              </Box>

              {/* Floating Card */}
              <Card
                sx={{
                  position: 'absolute',
                  bottom: -40,
                  left: -40,
                  width: 280,
                  borderRadius: 6,
                  backdropFilter: 'blur(12px)',
                  background: 'rgba(255,255,255,0.95)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" spacing={2} mb={2}>
                    <BusinessIcon
                      sx={{
                        color: '#1976d2',
                        fontSize: 45,
                      }}
                    />

                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight={800}
                      >
                        500+
                      </Typography>

                      <Typography color="text.secondary">
                        Companies Managed
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography
                    color="text.secondary"
                    lineHeight={1.8}
                  >
                    Trusted by modern construction businesses
                    for scalable workforce and company management.
                  </Typography>
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
          py: 14,
        }}
      >
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={800}
          mb={2}
        >
          Why Choose BuildFlow ERP?
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
          Everything your construction company needs to manage
          teams, workflows, permissions, and company operations efficiently.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 7,
                  p: 1,
                  height: '100%',
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  transition: '0.35s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
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
                        'linear-gradient(135deg,#1976d2 0%, #42a5f5 100%)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 4,
                      boxShadow:
                        '0 15px 35px rgba(25,118,210,0.25)',
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