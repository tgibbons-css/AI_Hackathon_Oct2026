import { Typography } from '@mui/material'

export function PageHeader({ title, description, eyebrow }: { title: string; description: string; eyebrow: string }) {
  return <div className="page-heading">
    <span className="eyebrow">{eyebrow}</span>
    <Typography component="h1" variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mt: 2, mb: 2 }}>{title}</Typography>
    <Typography color="text.secondary" sx={{ maxWidth: 660 }}>{description}</Typography>
  </div>
}
