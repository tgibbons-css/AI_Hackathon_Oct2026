import { Button, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, Stack, Switch } from '@mui/material'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import PauseRounded from '@mui/icons-material/PauseRounded'
import RestartAlt from '@mui/icons-material/RestartAlt'
import type { BreathingPace } from './timing'
import type { SessionStatus } from './BreathingCircle'

export type PacePreset = 'gentle' | 'balanced' | 'custom'
type Props = {
  status: SessionStatus; duration: number; preset: PacePreset; pace: BreathingPace; reduceMotion: boolean
  onDuration: (value: number) => void; onPreset: (value: PacePreset) => void
  onPace: (value: BreathingPace) => void; onReduceMotion: (value: boolean) => void
  onStart: () => void; onPause: () => void; onRestart: () => void
}

export function BreathingControls(props: Props) {
  const { status, duration, preset, pace, reduceMotion } = props
  const active = status === 'running' || status === 'paused'
  return <div className="breathing-controls">
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <FormControl fullWidth disabled={active}>
        <InputLabel id="session-duration-label">Session length</InputLabel>
        <Select labelId="session-duration-label" label="Session length" value={duration} onChange={event => props.onDuration(Number(event.target.value))}>
          {[60, 120, 180].map(seconds => <MenuItem key={seconds} value={seconds}>{seconds / 60} {seconds === 60 ? 'minute' : 'minutes'}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl fullWidth disabled={active}>
        <InputLabel id="breathing-pace-label">Breathing pace</InputLabel>
        <Select labelId="breathing-pace-label" label="Breathing pace" value={preset} onChange={event => props.onPreset(event.target.value as PacePreset)}>
          <MenuItem value="gentle">Gentle · 3 in / 4 out</MenuItem>
          <MenuItem value="balanced">Balanced · 4 in / 4 out</MenuItem>
          <MenuItem value="custom">Custom · your own pace</MenuItem>
        </Select>
      </FormControl>
    </Stack>
    {preset === 'custom' && <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      {(['inhale', 'exhale'] as const).map(phase => <FormControl fullWidth disabled={active} key={phase}>
        <InputLabel id={`${phase}-label`}>{phase === 'inhale' ? 'Breathe in' : 'Breathe out'}</InputLabel>
        <Select labelId={`${phase}-label`} label={phase === 'inhale' ? 'Breathe in' : 'Breathe out'} value={pace[phase]} onChange={event => props.onPace({ ...pace, [phase]: Number(event.target.value) })}>
          {[2, 3, 4, 5, 6].map(seconds => <MenuItem key={seconds} value={seconds}>{seconds} seconds</MenuItem>)}
        </Select>
      </FormControl>)}
    </Stack>}
    {active && <FormHelperText sx={{ mx: 0, mt: 1 }}>To change your length or pace, end this activity and choose Try Again.</FormHelperText>}
    <FormControlLabel sx={{ mt: 1, mb: 1 }} control={<Switch checked={reduceMotion} onChange={event => props.onReduceMotion(event.target.checked)} />} label="Reduce Motion" />
    <div className="breathing-actions">
      {status === 'ready' ? <Button variant="contained" startIcon={<PlayArrowRounded />} onClick={props.onStart}>Start</Button>
        : <Button variant="contained" startIcon={status === 'paused' ? <PlayArrowRounded /> : <PauseRounded />} onClick={props.onPause}>{status === 'paused' ? 'Resume' : 'Pause'}</Button>}
      <Button variant="outlined" startIcon={<RestartAlt />} onClick={props.onRestart} disabled={!active}>Restart</Button>
    </div>
  </div>
}
