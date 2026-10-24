import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material'
import { InfoAlert } from './InfoAlert'

export function HelpDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <Dialog open={open} onClose={onClose} aria-labelledby="help-title" aria-describedby="help-description" fullWidth maxWidth="sm">
    <DialogTitle id="help-title">You deserve support</DialogTitle>
    <DialogContent>
      <DialogContentText id="help-description" sx={{ mb: 3 }}>If things feel overwhelming, support is available. These resources are for the United States.</DialogContentText>
      <Stack spacing={3}>
        <div><Typography component="h2" variant="h6">Immediate danger</Typography><Typography>If someone is in immediate danger in the United States, call <strong>911</strong>.</Typography></div>
        <div><Typography component="h2" variant="h6">Mental health crisis support</Typography><Typography>In the United States, call or text <strong>988</strong> for mental health crisis support.</Typography></div>
        <div><Typography component="h2" variant="h6">Someone you trust</Typography><Typography>You can also contact a trusted adult, school counselor, or healthcare professional.</Typography></div>
        <InfoAlert>Opening this dialog does not contact anyone. Steady Steps does not monitor emergencies.</InfoAlert>
      </Stack>
    </DialogContent>
    <DialogActions><Button variant="contained" onClick={onClose}>Close</Button></DialogActions>
  </Dialog>
}
