import { Button, Paper, Typography } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import type { SvgIconComponent } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { PageHeader } from './PageHeader'
import { InfoAlert } from './InfoAlert'

export function PlaceholderPage({ title, description, icon: Icon, note }: { title: string; description: string; icon: SvgIconComponent; note: string }) {
  return <div className="placeholder-page">
    <Button component={Link} to="/" startIcon={<ArrowBack />} sx={{ mb: 3, ml: -2 }}>Back to home</Button>
    <PageHeader eyebrow="ONE STEP AT A TIME" title={title} description={description} />
    <Paper variant="outlined" className="placeholder-card">
      <span className="placeholder-icon"><Icon sx={{ fontSize: 48 }} /></span>
      <span className="coming-soon">Coming in a future phase</span>
      <Typography component="h2" variant="h2" sx={{ fontSize: { xs: '1.6rem', sm: '2rem' }, mt: 2, mb: 2 }}>A little space, just for you.</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 470, mx: 'auto', mb: 3 }}>{note}</Typography>
      <Button component={Link} to="/" variant="contained">Explore the home page</Button>
    </Paper>
    <InfoAlert>You choose what feels helpful. There’s no pressure to share, and it’s always okay to take a break.</InfoAlert>
  </div>
}
