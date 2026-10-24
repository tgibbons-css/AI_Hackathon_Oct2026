import { Alert } from '@mui/material'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import type { ReactNode } from 'react'

export function InfoAlert({ children }: { children: ReactNode }) {
  return <Alert severity="info" icon={<InfoOutlined fontSize="small" />} sx={{ bgcolor: '#EFF4F3', color: 'text.secondary', borderRadius: 3, alignItems: 'center', '& .MuiAlert-icon': { color: 'primary.main' } }}>{children}</Alert>
}
