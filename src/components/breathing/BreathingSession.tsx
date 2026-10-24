import { useEffect, useRef, useState } from 'react'
import { Button, LinearProgress, Paper, Stack, Typography, useMediaQuery } from '@mui/material'
import SpaOutlined from '@mui/icons-material/SpaOutlined'
import { Link } from 'react-router-dom'
import { InfoAlert } from '../InfoAlert'
import { BreathingCircle, type SessionStatus } from './BreathingCircle'
import { BreathingControls, type PacePreset } from './BreathingControls'
import { formatTime, sessionElapsed, type BreathingPace } from './timing'
import './breathing.css'

const responses = [
  { label: 'A little better', message: 'It’s okay to enjoy a little ease. Choose what feels helpful next.' },
  { label: 'About the same', message: 'It’s okay to feel the same. You can take a break or explore something different.' },
  { label: 'Not better', message: 'You haven’t done anything wrong. Breathing exercises don’t feel helpful for everyone. You can stop, try something different, or reach out to someone you trust.' },
  { label: 'Prefer not to say', message: 'You don’t need to share how you feel. Choose what feels right for you next.' },
]

export function BreathingSession() {
  const browserReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null)
  const reduceMotion = motionOverride ?? browserReducedMotion
  const [status, setStatus] = useState<SessionStatus>('ready')
  const [duration, setDuration] = useState(120)
  const [preset, setPreset] = useState<PacePreset>('gentle')
  const [pace, setPace] = useState<BreathingPace>({ inhale: 3, exhale: 4 })
  const [elapsed, setElapsed] = useState(0)
  const elapsedRef = useRef(0)
  const [restartKey, setRestartKey] = useState(0)
  const [message, setMessage] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const resultHeading = useRef<HTMLHeadingElement>(null)
  const durationMs = duration * 1000
  const result = status === 'complete' || status === 'ended' || status === 'followup'

  useEffect(() => {
    if (status !== 'running') return
    let frameId: number
    const baseline = performance.now() - elapsedRef.current
    const tick = (now: number) => {
      const next = sessionElapsed(baseline, now, durationMs)
      elapsedRef.current = next
      setElapsed(next)
      if (next >= durationMs) setStatus('complete')
      else frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [status, durationMs, restartKey])

  useEffect(() => {
    if (result) resultHeading.current?.focus()
  }, [result, status])

  const reset = (nextStatus: SessionStatus) => {
    elapsedRef.current = 0
    setElapsed(0)
    setMessage('')
    setStatus(nextStatus)
    // Recreate the clock even when Restart is pressed during a running session.
    setRestartKey(value => value + 1)
    panelRef.current?.focus({ preventScroll: true })
    panelRef.current?.scrollIntoView({ block: 'start' })
  }

  return <>
    <Paper ref={panelRef} tabIndex={-1} role="region" aria-label="Guided breathing activity" variant="outlined" className="breathing-panel">
      {result ? <div className="breathing-result">
        <span className="breathing-result-icon"><SpaOutlined sx={{ fontSize: 42 }} /></span>
        <Typography component="h2" ref={resultHeading} tabIndex={-1} variant="h2" sx={{ fontSize: { xs: '1.6rem', sm: '2rem' }, mb: 2 }}>
          {status === 'complete' ? "You've completed this breathing activity. How are you feeling?" : status === 'ended' ? 'It’s okay to stop here.' : 'Thank you for taking a moment for yourself.'}
        </Typography>
        {status === 'complete' ? <Stack spacing={1.5} sx={{ maxWidth: 330, mx: 'auto', mt: 3 }}>
          {responses.map(response => <Button key={response.label} variant="outlined" onClick={() => { setMessage(response.message); setStatus('followup') }}>{response.label}</Button>)}
        </Stack> : <Typography color="text.secondary">{status === 'ended' ? 'You’re in charge of your pace. You can rest, try another activity, or reach out to someone you trust.' : message}</Typography>}
        <div className="breathing-next-actions">
          <Button variant="contained" onClick={() => reset('ready')}>Try Again</Button>
          <Button variant="outlined" component={Link} to="/reflect">Try Another Activity</Button>
          <Button component={Link} to="/">Return Home</Button>
        </div>
      </div> : <>
        <BreathingCircle elapsed={elapsed} pace={pace} status={status} reduceMotion={reduceMotion} />
        <div className="breathing-progress">
          <div className="breathing-time"><span>Elapsed time</span><span>{formatTime(elapsed)} / {formatTime(durationMs)}</span></div>
          <LinearProgress variant="determinate" value={elapsed / durationMs * 100} aria-label="Session elapsed time" aria-valuetext={`${formatTime(elapsed)} of ${formatTime(durationMs)}`} sx={{ height: 6, borderRadius: 6, bgcolor: '#E8EFEB' }} />
        </div>
        <BreathingControls status={status} duration={duration} preset={preset} pace={pace} reduceMotion={reduceMotion}
          onDuration={setDuration} onPreset={value => { setPreset(value); if (value !== 'custom') setPace({ inhale: value === 'gentle' ? 3 : 4, exhale: 4 }) }}
          onPace={setPace} onReduceMotion={setMotionOverride} onStart={() => reset('running')}
          onPause={() => {
            setStatus(status === 'paused' ? 'running' : 'paused')
            if (status === 'paused') {
              panelRef.current?.focus({ preventScroll: true })
              panelRef.current?.scrollIntoView({ block: 'start' })
            }
          }} onRestart={() => reset('running')} />
      </>}
    </Paper>
    {!result && <div className="breathing-end-dock"><Button variant="outlined" onClick={() => setStatus('ended')}>End Activity</Button></div>}
    <div className="breathing-safety"><InfoAlert>If focusing on your breathing feels uncomfortable, you can stop or choose another activity.</InfoAlert></div>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>This optional coping activity is not a treatment for PTSD or a guarantee of relaxation. Breathe comfortably; there’s no need to hold your breath or breathe deeply.</Typography>
  </>
}
