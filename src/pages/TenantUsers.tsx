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
import { useParams } from 'react-router-dom'
import { tenantUserService } from '../services/tenantUserService'
import type { User } from '../types'
import { useAppSelector } from '../store/hooks'
import { hasPermission, hasRole } from '../utils/permissions'

const COMPANY_ROLES = ['manager', 'engineer', 'employee']

export default function TenantUsers() {
  const { tenant = '' } = useParams<{ tenant: string }>()
  const { user: currentUser } = useAppSelector((state) => state.auth)
  const [users, setUsers] = useState<User[]>([])
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

  const isOwner = hasRole(currentUser, ['owner'])
  const canCreate = isOwner && hasPermission(currentUser, 'company.users.create')
  const canUpdate = isOwner && hasPermission(currentUser, 'company.users.update')
  const canDelete = isOwner && hasPermission(currentUser, 'company.users.delete')

  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await tenantUserService.list(tenant, {
        search: search || undefined,
        page: page + 1,
        per_page: rowsPerPage,
      })
      setUsers(res.data)
      setTotal(res.meta.total)
    } catch {
      setError('Failed to load company users')
    } finally {
      setLoading(false)
    }
  }, [tenant, search, page, rowsPerPage])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

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
      roles: user.roles?.map((r) => r.name) || [],
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      if (editing) {
        await tenantUserService.update(tenant, editing.id, {
          name: form.name,
          email: form.email,
          ...(form.password ? { password: form.password, password_confirmation: form.password_confirmation } : {}),
          roles: form.roles,
        })
      } else {
        await tenantUserService.create(tenant, form)
      }
      setDialogOpen(false)
      loadUsers()
    } catch {
      setError('Failed to save user')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this user?')) return
    try {
      await tenantUserService.delete(tenant, id)
      loadUsers()
    } catch {
      setError('Failed to delete user')
    }
  }

  if (!isOwner) {
    return (
      <Typography color="text.secondary">
        Only the company owner can manage users.
      </Typography>
    )
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Company Users
        </Typography>
        {canCreate && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Add User
          </Button>
        )}
      </Stack>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      <TextField
        size="small"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
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
                    {canUpdate && !user.roles?.some((r) => r.name === 'owner') && (
                      <IconButton onClick={() => openEdit(user)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    {canDelete && !user.roles?.some((r) => r.name === 'owner') && (
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
        <DialogTitle>{editing ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            value={form.password_confirmation}
            onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={form.roles[0] || ''}
              label="Role"
              onChange={(e) => setForm({ ...form, roles: [e.target.value] })}
            >
              {COMPANY_ROLES.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
