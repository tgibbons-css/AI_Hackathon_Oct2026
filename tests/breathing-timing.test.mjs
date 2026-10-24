import test from 'node:test'
import assert from 'node:assert/strict'
import { breathingFrame, sessionElapsed, formatTime } from '../src/components/breathing/timing.ts'

test('gentle breathing has no hold between inhale, exhale, and next cycle', () => {
  const pace = { inhale: 3, exhale: 4 }
  assert.deepEqual(breathingFrame(0, pace), { inhaling: true, expansion: 0 })
  assert.equal(breathingFrame(2999, pace).inhaling, true)
  assert.deepEqual(breathingFrame(3000, pace), { inhaling: false, expansion: 1 })
  assert.equal(breathingFrame(6999, pace).inhaling, false)
  assert.deepEqual(breathingFrame(7000, pace), { inhaling: true, expansion: 0 })
})

test('all allowed phase lengths expand and contract continuously at their boundaries', () => {
  for (let inhale = 2; inhale <= 6; inhale++) {
    for (let exhale = 2; exhale <= 6; exhale++) {
      const pace = { inhale, exhale }
      assert.ok(Math.abs(breathingFrame(inhale * 500, pace).expansion - 0.5) < 1e-8)
      assert.ok(Math.abs(breathingFrame(inhale * 1000 + exhale * 500, pace).expansion - 0.5) < 1e-8)
      assert.ok(breathingFrame(inhale * 1000 - 1, pace).expansion > 0.999)
      assert.ok(breathingFrame((inhale + exhale) * 1000 - 1, pace).expansion < 0.001)
    }
  }
})

test('elapsed clock catches up after a delayed frame and stops at the selected duration', () => {
  for (const duration of [60000, 120000, 180000]) {
    assert.equal(sessionElapsed(500, 500, duration), 0)
    assert.equal(sessionElapsed(500, 15500, duration), 15000)
    assert.equal(sessionElapsed(500, duration + 500, duration), duration)
    assert.equal(sessionElapsed(500, duration + 9999, duration), duration)
  }
})

test('a resumed baseline preserves elapsed time while a restart begins at zero', () => {
  const pausedElapsed = 4250
  const resumeTime = 20000
  assert.equal(sessionElapsed(resumeTime - pausedElapsed, resumeTime, 60000), pausedElapsed)
  assert.equal(sessionElapsed(resumeTime - pausedElapsed, resumeTime + 1000, 60000), 5250)
  assert.equal(sessionElapsed(resumeTime, resumeTime, 60000), 0)
})

test('elapsed labels remain readable at minute boundaries', () => {
  assert.equal(formatTime(0), '0:00')
  assert.equal(formatTime(59999), '0:59')
  assert.equal(formatTime(60000), '1:00')
  assert.equal(formatTime(180000), '3:00')
})
