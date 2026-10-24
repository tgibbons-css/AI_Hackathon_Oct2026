import Air from '@mui/icons-material/Air'
import { Typography } from '@mui/material'
import { breathingFrame, type BreathingPace } from './timing'

export type SessionStatus = 'ready' | 'running' | 'paused' | 'complete' | 'ended' | 'followup'

export function BreathingCircle({ elapsed, pace, status, reduceMotion }: {
  elapsed: number; pace: BreathingPace; status: SessionStatus; reduceMotion: boolean
}) {
  const { inhaling, expansion } = breathingFrame(elapsed, pace)
  const instruction = status === 'ready' ? 'Begin when you’re ready.' : status === 'paused'
    ? 'Paused. Take your time.' : inhaling ? 'Breathe in gently...' : 'Breathe out comfortably...'
  return <div className="breathing-visual">
    <div className="breathing-circle-space" aria-hidden="true">
      <div className="breathing-guide" />
      <div className={`breathing-circle${reduceMotion ? ' motion-reduced' : ''}`} style={{ transform: `scale(${reduceMotion ? 0.85 : 0.68 + expansion * 0.32})` }}><Air sx={{ fontSize: 58 }} /></div>
    </div>
    <div className="breathing-prompt" role="status" aria-live="polite" aria-atomic="true">
      <Typography component="h2" variant="h2" sx={{ fontSize: { xs: '1.4rem', sm: '1.8rem' }, mb: 1 }}>{instruction}</Typography>
      <Typography variant="body2" color="text.secondary">{status === 'ready' ? 'Let your breathing stay comfortable. No holding needed.' : status === 'paused' ? 'Resume whenever you feel ready, or end here.' : `${inhaling ? 'Inhale' : 'Exhale'} · ${inhaling ? pace.inhale : pace.exhale} seconds`}</Typography>
    </div>
  </div>
}
