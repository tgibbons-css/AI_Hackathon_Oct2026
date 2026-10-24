import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import type { SupportGroup } from '../../data/supportGroups'
import { InfoAlert } from '../InfoAlert'
import { SupportGroupFacts, SupportGroupStatus } from './SupportGroupCard'

export function SupportGroupDetails({ group, onClose }: { group: SupportGroup | null; onClose: () => void }) {
  return <Dialog open={Boolean(group)} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="support-details-title">
    {group && <><DialogTitle id="support-details-title">{group.name}</DialogTitle><DialogContent>
      <SupportGroupStatus group={group} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>{group.organization}</Typography>
      <Typography sx={{ my: 2 }}>{group.description}</Typography>
      <SupportGroupFacts group={group} />
      <InfoAlert>{group.isDemo ? 'This fictional program demonstrates the kinds of groups you might explore. No meeting, enrollment, or registration is available here. Use the established organizations below to learn about real resources.' : 'Check the official organization for current availability, eligibility, and meeting requirements.'}</InfoAlert>
    </DialogContent><DialogActions><Button onClick={onClose} variant="contained">Close</Button></DialogActions></>}
  </Dialog>
}
