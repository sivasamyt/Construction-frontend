import { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TablePagination,
} from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import { companyService } from '../services/companyService'
import type { Company } from '../types'
import { buildTenantUrl } from '../utils/tenant'

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Company | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const loadCompanies = useCallback(async () => {
    setLoading(true)
    try {
      const res = await companyService.list({
        search: search || undefined,
        page: page + 1,
        per_page: rowsPerPage,
      })
      setCompanies(res.data)
      setTotal(res.meta.total)
    } catch {
      setError('Failed to load companies')
    } finally {
      setLoading(false)
    }
  }, [search, page, rowsPerPage])

  useEffect(() => {
    loadCompanies()
  }, [loadCompanies])

  const handleRowClick = async (company: Company) => {
    setDetailLoading(true)
    setSelected(company)
    try {
      const res = await companyService.show(company.id)
      setSelected(res.data)
    } catch {
      setError('Failed to load company details')
    } finally {
      setDetailLoading(false)
    }
  }

  const domainSlug = selected?.domain?.domain ?? ''
  const domainUrl = domainSlug ? buildTenantUrl(domainSlug) : '—'

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <BusinessIcon color="primary" />
        <Typography variant="h5" fontWeight={600}>
          Companies
        </Typography>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <TextField
        size="small"
        placeholder="Search by name, email, or domain..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, minWidth: 320 }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Domain</TableCell>
                <TableCell>Owner Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No companies found
                  </TableCell>
                </TableRow>
              ) : (
                companies.map((company) => (
                  <TableRow
                    key={company.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(company)}
                  >
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.domain?.domain ?? '—'}</TableCell>
                    <TableCell>{company.owner?.email ?? '—'}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={company.owner ? 'Active' : 'No owner'}
                        color={company.owner ? 'success' : 'default'}
                      />
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

      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Company Details</DialogTitle>
        <DialogContent>
          {detailLoading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : selected ? (
            <Stack spacing={2} sx={{ pt: 1, pb: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Company Name
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {selected.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Domain URL
                </Typography>
                {domainSlug ? (
                  <Link href={domainUrl} target="_blank" rel="noopener noreferrer">
                    {domainUrl}
                  </Link>
                ) : (
                  <Typography variant="body1">—</Typography>
                )}
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Owner Email
                </Typography>
                <Typography variant="body1">
                  {selected.owner?.email ?? 'No owner registered yet'}
                </Typography>
              </Box>
              {selected.owner?.name && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Owner Name
                  </Typography>
                  <Typography variant="body1">{selected.owner.name}</Typography>
                </Box>
              )}
            </Stack>
          ) : null}
        </DialogContent>
      </Dialog>
    </Box>
  )
}
