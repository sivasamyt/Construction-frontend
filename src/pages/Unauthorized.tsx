import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <Box textAlign="center" py={8}>
      <Typography variant="h3" gutterBottom>
        403
      </Typography>
      <Typography color="text.secondary" mb={3}>
        You do not have permission to access this page.
      </Typography>
      <Button component={Link} to="/dashboard" variant="contained">
        Back to Dashboard
      </Button>
    </Box>
  )
}
