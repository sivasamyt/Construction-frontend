import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useAppSelector } from '../store/hooks'

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Welcome back, {user?.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Role</Typography>
              <Typography variant="h5">{user?.roles?.[0]?.name ?? 'N/A'}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Permissions</Typography>
              <Typography variant="h5">{user?.permissions?.length ?? 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">Email</Typography>
              <Typography variant="h6">{user?.email}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
