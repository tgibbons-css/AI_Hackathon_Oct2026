import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import type { AgeGroup, SupportPreferences } from './filterSupportGroups'

export function SupportFilters({ value, onChange }: { value: SupportPreferences; onChange: (value: SupportPreferences) => void }) {
  return <>
    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
      <FormControl fullWidth><InputLabel id="support-age">Age group</InputLabel><Select labelId="support-age" label="Age group" value={value.age} onChange={event => onChange({ ...value, age: event.target.value as AgeGroup })}>
        <MenuItem value="any">Any age</MenuItem><MenuItem value="under-13">12 and under</MenuItem><MenuItem value="13-17">13–17</MenuItem><MenuItem value="18-24">18–24</MenuItem>
      </Select></FormControl>
      <FormControl fullWidth><InputLabel id="support-format">Meeting format</InputLabel><Select labelId="support-format" label="Meeting format" value={value.format} onChange={event => onChange({ ...value, format: event.target.value as SupportPreferences['format'] })}>
        <MenuItem value="either">Either</MenuItem><MenuItem value="in-person">In person</MenuItem><MenuItem value="online">Online</MenuItem>
      </Select></FormControl>
      <FormControl fullWidth><InputLabel id="support-location">Location</InputLabel><Select labelId="support-location" label="Location" value={value.location} onChange={event => onChange({ ...value, location: event.target.value as SupportPreferences['location'] })}>
        <MenuItem value="anywhere">Anywhere in the United States / Online</MenuItem><MenuItem value="duluth">Duluth / Northeastern Minnesota</MenuItem>
      </Select></FormControl>
    </Stack>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Age filters show overlapping age ranges; check each listing’s eligible ages. Hybrid samples match either format. Anywhere includes all sample locations; Duluth includes local samples and nationwide online samples. Location is selected manually.</Typography>
  </>
}
