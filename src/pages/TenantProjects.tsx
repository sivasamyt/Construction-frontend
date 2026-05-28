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
import FolderIcon from '@mui/icons-material/Folder'
import { useParams } from 'react-router-dom'
import { tenantProjectService } from '../services/tenantProjectService'
import type { Project } from '../types'
import { useAppSelector } from '../store/hooks'
import { hasPermission, hasRole } from '../utils/permissions'

const PROJECT_STATUSES = [
  { value: 'planned', label: 'Planned' },
  { value: 'active', label: 'Active' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
]

const statusColor: Record<string, 'default' | 'primary' | 'warning' | 'success'> = {
  planned: 'default',
  active: 'primary',
  on_hold: 'warning',
  completed: 'success',
}

export default function TenantProjects() {
  const { tenant = '' } = useParams<{ tenant: string }>()
  const { user: currentUser } = useAppSelector((state) => state.auth)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'active',
    start_date: '',
    end_date: '',
  })

  const canMutate =
    hasRole(currentUser, ['owner', 'manager'])
  const canCreate = canMutate && hasPermission(currentUser, 'company.projects.create')
  const canUpdate = canMutate && hasPermission(currentUser, 'company.projects.update')
  const canDelete = canMutate && hasPermission(currentUser, 'company.projects.delete')

  const loadProjects = useCallback(async () => {
    setLoading(true)
    try {
      const res = await tenantProjectService.list(tenant, {
        search: search || undefined,
        page: page + 1,
        per_page: rowsPerPage,
      })
      setProjects(res.data)
      setTotal(res.meta.total)
    } catch {
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [tenant, search, page, rowsPerPage])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  const openCreate = () => {
    setEditing(null)
    setForm({
      name: '',
      description: '',
      status: 'active',
      start_date: '',
      end_date: '',
    })
    setDialogOpen(true)
  }

  const openEdit = (project: Project) => {
    setEditing(project)
    setForm({
      name: project.name,
      description: project.description ?? '',
      status: project.status,
      start_date: project.start_date ?? '',
      end_date: project.end_date ?? '',
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      const payload = {
        name: form.name,
        description: form.description || undefined,
        status: form.status,
        start_date: form.start_date || undefined,
        end_date: form.end_date || undefined,
      }
      if (editing) {
        await tenantProjectService.update(tenant, editing.id, payload)
      } else {
        await tenantProjectService.create(tenant, payload)
      }
      setDialogOpen(false)
      loadProjects()
    } catch {
      setError('Failed to save project')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return
    try {
      await tenantProjectService.delete(tenant, id)
      loadProjects()
    } catch {
      setError('Failed to delete project')
    }
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FolderIcon color="primary" />
          <Typography variant="h5" fontWeight={600}>
            Projects
          </Typography>
        </Stack>
        {canCreate && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Add Project
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
        placeholder="Search projects..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(0)
        }}
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
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No projects found
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id} hover>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={project.status.replace('_', ' ')}
                        color={statusColor[project.status] ?? 'default'}
                      />
                    </TableCell>
                    <TableCell>{project.start_date ?? '—'}</TableCell>
                    <TableCell>{project.end_date ?? '—'}</TableCell>
                    <TableCell align="right">
                      {canUpdate && (
                        <IconButton onClick={() => openEdit(project)}>
                          <EditIcon />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton color="error" onClick={() => handleDelete(project.id)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
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
        <DialogTitle>{editing ? 'Edit Project' : 'Add Project'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Project Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              minRows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={form.status}
                label="Status"
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {PROJECT_STATUSES.map((s) => (
                  <MenuItem key={s.value} value={s.value}>
                    {s.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.start_date}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            />
            <TextField
              fullWidth
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.end_date}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={!form.name.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
