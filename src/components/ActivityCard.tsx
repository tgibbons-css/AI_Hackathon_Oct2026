import { Card, CardActionArea, Typography } from '@mui/material'
import ArrowForward from '@mui/icons-material/ArrowForward'
import type { SvgIconComponent } from '@mui/icons-material'
import { Link } from 'react-router-dom'

type ActivityCardProps = { title: string; description: string; button: string; to: string; icon: SvgIconComponent; tone: 'teal' | 'blue' | 'sage'; number: string }

export function ActivityCard({ title, description, button, to, icon: Icon, tone, number }: ActivityCardProps) {
  return <Card variant="outlined" className={`activity-card ${tone}`}>
    <CardActionArea component={Link} to={to} className="activity-action" aria-label={`${title}: ${button}`}>
      <div className="card-top"><span className="activity-icon"><Icon sx={{ fontSize: 30 }} /></span><span className="card-number" aria-hidden="true">{number}</span></div>
      <Typography component="h3" variant="h3" sx={{ fontSize: '1.55rem', mb: 1.5 }}>{title}</Typography>
      <Typography color="text.secondary" className="activity-description">{description}</Typography>
      <span className="card-cta">{button}<ArrowForward fontSize="small" /></span>
    </CardActionArea>
  </Card>
}
