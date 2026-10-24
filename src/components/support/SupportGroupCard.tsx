import { Button, Card, CardContent, Chip, Typography } from '@mui/material'
import { demoLabel, facilitationLabels, formatLabels, supportCategories, type SupportGroup } from '../../data/supportGroups'

export function SupportGroupFacts({ group }: { group: SupportGroup }) {
  return <>
    <div className="support-tags">{group.categories.map(category => <Chip size="small" key={category} label={supportCategories.find(item => item.id === category)?.name} />)}</div>
    <dl className="support-facts">
      <div><dt>Eligible ages</dt><dd>{group.minAge}–{group.maxAge}</dd></div>
      <div><dt>Format</dt><dd>{formatLabels[group.format]}</dd></div>
      <div><dt>Coverage</dt><dd>{group.location}</dd></div>
      <div><dt>Facilitation</dt><dd>{facilitationLabels[group.facilitation]}</dd></div>
      <div><dt>Cost</dt><dd>{group.costLabel || 'Ask the organization'}</dd></div>
    </dl>
  </>
}

export function SupportGroupStatus({ group }: { group: SupportGroup }) {
  return <Typography className="support-status" variant="body2">{group.isDemo ? demoLabel : group.verified ? `Verified program${group.lastVerified ? ` · checked ${group.lastVerified}` : ''}` : 'Not verified'}</Typography>
}

export function SupportGroupCard({ group, onDetails }: { group: SupportGroup; onDetails: (group: SupportGroup) => void }) {
  return <Card variant="outlined" className="support-group-card"><CardContent>
    <SupportGroupStatus group={group} />
    <Typography component="h3" variant="h6" sx={{ mt: 2, mb: .5 }}>{group.name}</Typography>
    <Typography variant="caption" color="text.secondary">{group.organization}</Typography>
    <Typography color="text.secondary" variant="body2" sx={{ my: 2 }}>{group.description}</Typography>
    <SupportGroupFacts group={group} />
    {!group.isDemo && group.verified && group.officialUrl
      ? <Button component="a" href={group.officialUrl} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" variant="outlined">Learn More<span className="support-sr-only"> about {group.name} (opens a new tab)</span></Button>
      : <Button variant="outlined" onClick={() => onDetails(group)}>Learn More<span className="support-sr-only"> about {group.name}</span></Button>}
  </CardContent></Card>
}
