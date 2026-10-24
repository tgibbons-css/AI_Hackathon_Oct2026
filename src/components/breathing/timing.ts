export type BreathingPace = { inhale: number; exhale: number }

// Both the instruction and circle derive from one clock, avoiding timer drift.
export function breathingFrame(elapsedMs: number, pace: BreathingPace) {
  const position = Math.max(0, elapsedMs) % ((pace.inhale + pace.exhale) * 1000)
  const inhaling = position < pace.inhale * 1000
  const progress = inhaling ? position / (pace.inhale * 1000)
    : (position - pace.inhale * 1000) / (pace.exhale * 1000)
  const eased = (1 - Math.cos(progress * Math.PI)) / 2
  return { inhaling, expansion: inhaling ? eased : 1 - eased }
}

export function sessionElapsed(baseline: number, now: number, durationMs: number) {
  return Math.min(durationMs, Math.max(0, now - baseline))
}

export function formatTime(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000)
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}
