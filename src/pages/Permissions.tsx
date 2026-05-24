import { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { permissionService } from '../services/permissionService'
import type { Permission } from '../types'
import { useAppSelector } from '../store/hooks'
import { hasPermission, hasRole } from '../utils/permissions'

export default function Permissions() {
  const { user } = useAppSelector((state) => state.auth)
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Permission | null>(null)
  const [name, setName] = useState('')

  const isPrivileged = hasRole(user, ['super_admin', 'admin'])
  const canCreate = isPrivileged && hasPermission(user, 'permissions.create')
  const canUpdate = isPrivileged && hasPermission(user, 'permissions.update')
  const canDelete = isPrivileged && hasPermission(user, 'permissions.delete')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await permissionService.list({
        search: search || undefined,
        page: page + 1,
        per_page: rowsPerPage,
      })
      setPermissions(res.data)
      setTotal(res.meta.total)
    } catch {
      setError('Failed to load permissions')
    } finally {
      setLoading(false)
    }
  }, [search, page, rowsPerPage])

  useEffect(() => {
    load()
  }, [load])

  const handleSave = async () => {
    try {
      if (editing) {
        await permissionService.update(editing.id, { name })
      } else {
        await permissionService.create({ name })
      }
      setDialogOpen(false)
      load()
    } catch {
      setError('Failed to save permission')
    }
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Permission Management</Typography>
        {canCreate && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { setEditing(null); setName(''); setDialogOpen(true) }}
          >
            Add Permission
          </Button>
        )}
      </Stack>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        placeholder="Search permissions..."
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
                <TableCell>Guard</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((perm) => (
                <TableRow key={perm.id}>
                  <TableCell>{perm.name}</TableCell>
                  <TableCell>{perm.guard_name}</TableCell>
                  <TableCell align="right">
                    {canUpdate && (
                      <IconButton onClick={() => { setEditing(perm); setName(perm.name); setDialogOpen(true) }}>
                        <EditIcon />
                      </IconButton>
                    )}
                    {canDelete && (
                      <IconButton color="error" onClick={async () => { await permissionService.remove(perm.id); load() }}>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editing ? 'Edit Permission' : 'Create Permission'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Permission Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. reports.view"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
