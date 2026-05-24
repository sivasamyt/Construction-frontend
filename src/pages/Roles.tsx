import { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
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
  FormGroup,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { roleService } from '../services/roleService'
import { permissionService } from '../services/permissionService'
import type { Permission, Role } from '../types'
import { useAppSelector } from '../store/hooks'
import { hasPermission, hasRole } from '../utils/permissions'

export default function Roles() {
  const { user } = useAppSelector((state) => state.auth)
  const [roles, setRoles] = useState<Role[]>([])
  const [allPermissions, setAllPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Role | null>(null)
  const [form, setForm] = useState({ name: '', permissions: [] as string[] })

  const isPrivileged = hasRole(user, ['super_admin', 'admin'])
  const canCreate = isPrivileged && hasPermission(user, 'roles.create')
  const canUpdate = isPrivileged && hasPermission(user, 'roles.update')
  const canDelete = isPrivileged && hasPermission(user, 'roles.delete')

  const loadRoles = useCallback(async () => {
    setLoading(true)
    try {
      const res = await roleService.list({ search: search || undefined, page: page + 1, per_page: rowsPerPage })
      setRoles(res.data)
      setTotal(res.meta.total)
    } catch {
      setError('Failed to load roles')
    } finally {
      setLoading(false)
    }
  }, [search, page, rowsPerPage])

  useEffect(() => {
    loadRoles()
  }, [loadRoles])

  useEffect(() => {
    permissionService.list({ per_page: 100 }).then((res) => setAllPermissions(res.data))
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', permissions: [] })
    setDialogOpen(true)
  }

  const openEdit = (role: Role) => {
    setEditing(role)
    setForm({
      name: role.name,
      permissions: role.permissions?.map((p) => p.name) ?? [],
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      if (editing) {
        await roleService.update(editing.id, form)
      } else {
        await roleService.create(form)
      }
      setDialogOpen(false)
      loadRoles()
    } catch {
      setError('Failed to save role')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this role?')) return
    await roleService.remove(id)
    loadRoles()
  }

  const togglePermission = (name: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(name)
        ? prev.permissions.filter((p) => p !== name)
        : [...prev.permissions, name],
    }))
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Role Management</Typography>
        {canCreate && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Add Role
          </Button>
        )}
      </Stack>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        placeholder="Search roles..."
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
                <TableCell>Permissions</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    {role.permissions?.slice(0, 3).map((p) => (
                      <Chip key={p.id} label={p.name} size="small" sx={{ mr: 0.5 }} />
                    ))}
                    {(role.permissions?.length ?? 0) > 3 && (
                      <Chip label={`+${(role.permissions?.length ?? 0) - 3}`} size="small" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {canUpdate && <IconButton onClick={() => openEdit(role)}><EditIcon /></IconButton>}
                    {canDelete && (
                      <IconButton color="error" onClick={() => handleDelete(role.id)}>
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
        <DialogTitle>{editing ? 'Edit Role' : 'Create Role'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Role Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              disabled={!!editing && ['super_admin', 'admin', 'manager', 'engineer', 'employee', 'guest'].includes(editing.name)}
            />
            {isPrivileged && (
              <FormGroup>
                <Typography variant="subtitle2" gutterBottom>Permissions</Typography>
                {allPermissions.map((perm) => (
                  <FormControlLabel
                    key={perm.id}
                    control={
                      <Checkbox
                        checked={form.permissions.includes(perm.name)}
                        onChange={() => togglePermission(perm.name)}
                      />
                    }
                    label={perm.name}
                  />
                ))}
              </FormGroup>
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
