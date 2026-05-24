import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { useAppSelector } from '../store/hooks'

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">{user?.name}</Typography>
          <Typography color="text.secondary" mb={2}>
            {user?.email}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Roles
          </Typography>
          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap>
            {user?.roles?.map((role) => (
              <Chip key={role.id} label={role.name} color="primary" />
            ))}
          </Stack>
          <Typography variant="subtitle2" gutterBottom>
            Permissions
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {user?.permissions?.map((perm) => (
              <Chip key={perm} label={perm} size="small" variant="outlined" />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}
