import { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
  TablePagination,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { userService } from '../services/userService'
import { roleService } from '../services/roleService'
import type { Role, User } from '../types'
import { useAppSelector } from '../store/hooks'
import { hasPermission } from '../utils/permissions'

const ROLES = ['super_admin', 'admin', 'manager', 'engineer', 'employee', 'guest']

export default function Users() {
  const { user: currentUser } = useAppSelector((state) => state.auth)
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<User | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    roles: [] as string[],
  })

  const canCreate = hasPermission(currentUser, 'users.create')
  const canUpdate = hasPermission(currentUser, 'users.update')
  const canDelete = hasPermission(currentUser, 'users.delete')
  const canAssignRoles = hasPermission(currentUser, 'users.assign-roles')

  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await userService.list({
        search: search || undefined,
        page: page + 1,
        per_page: rowsPerPage,
      })
      setUsers(res.data)
      setTotal(res.meta.total)
    } catch {
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [search, page, rowsPerPage])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  useEffect(() => {
    roleService.list({ per_page: 100 }).then((res) => setRoles(res.data))
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', email: '', password: '', password_confirmation: '', roles: ['employee'] })
    setDialogOpen(true)
  }

  const openEdit = (user: User) => {
    setEditing(user)
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      password_confirmation: '',
      roles: user.roles?.map((r) => r.name) ?? [],
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      const payload: Record<string, unknown> = {
        name: form.name,
        email: form.email,
        roles: canAssignRoles ? form.roles : undefined,
      }
      if (form.password) {
        payload.password = form.password
        payload.password_confirmation = form.password_confirmation
      }
      if (editing) {
        await userService.update(editing.id, payload)
      } else {
        await userService.create(payload)
      }
      setDialogOpen(false)
      loadUsers()
    } catch {
      setError('Failed to save user')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this user?')) return
    await userService.remove(id)
    loadUsers()
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">User Management</Typography>
        {canCreate && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Add User
          </Button>
        )}
      </Stack>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        placeholder="Search users..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(0) }}
        size="small"
        sx={{ mb: 2, minWidth: 280 }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.roles?.map((r) => (
                      <Chip key={r.id} label={r.name} size="small" sx={{ mr: 0.5 }} />
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {canUpdate && (
                      <IconButton onClick={() => openEdit(user)}><EditIcon /></IconButton>
                    )}
                    {canDelete && (
                      <IconButton color="error" onClick={() => handleDelete(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10))
              setPage(0)
            }}
          />
        </>
      )}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Edit User' : 'Create User'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <TextField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <TextField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required={!editing} />
            <TextField label="Confirm Password" type="password" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} />
            {canAssignRoles && (
              <FormControl fullWidth>
                <InputLabel>Roles</InputLabel>
                <Select
                  multiple
                  value={form.roles}
                  label="Roles"
                  onChange={(e) => setForm({ ...form, roles: e.target.value as string[] })}
                >
                  {(roles.length ? roles.map((r) => r.name) : ROLES).map((r) => (
                    <MenuItem key={r} value={r}>{r}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
