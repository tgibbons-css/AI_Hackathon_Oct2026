import { TextField } from '@mui/material'

export function JournalTextField({ label, value, onChange, helperText }: {
  label: string; value: string; onChange: (value: string) => void; helperText?: string
}) {
  return <TextField fullWidth multiline minRows={3} maxRows={8} label={label} value={value}
    onChange={event => onChange(event.target.value)} autoComplete="off"
    slotProps={{ htmlInput: { maxLength: 600, spellCheck: false, autoCorrect: 'off', 'data-gramm': 'false' } }}
    helperText={helperText ?? 'Optional. A few words are enough, or you can reflect privately.'} />
}
