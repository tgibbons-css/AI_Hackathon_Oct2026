import test from 'node:test'
import assert from 'node:assert/strict'
import { createJournalState, journalReducer } from '../src/components/journal/journalState.ts'
import { fictionalThoughts, helpfulThoughtExamples } from '../src/data/journalPrompts.ts'

test('all five steps are reachable with no required answers and navigation stays in bounds', () => {
  let state = createJournalState()
  assert.equal(journalReducer(state, { type: 'back' }).step, 0)
  for (let step = 1; step <= 4; step++) {
    state = journalReducer(state, { type: 'next' })
    assert.equal(state.step, step)
    assert.equal(state.thought, '')
    assert.equal(state.helpfulThought, '')
  }
  assert.equal(journalReducer(state, { type: 'next' }).step, 4)
})

test('multiple emotions toggle independently without changing previous state', () => {
  const empty = createJournalState()
  const worried = journalReducer(empty, { type: 'emotion', value: 'Worried' })
  const both = journalReducer(worried, { type: 'emotion', value: 'Sad' })
  assert.deepEqual(both.emotions, ['Worried', 'Sad'])
  assert.deepEqual(journalReducer(both, { type: 'emotion', value: 'Worried' }).emotions, ['Sad'])
  assert.deepEqual(empty.emotions, [])
  assert.deepEqual(worried.emotions, ['Worried'])
})

test('fictional examples remain editable and responses survive Back and Next within the activity', () => {
  let state = journalReducer(createJournalState(), { type: 'text', field: 'thought', value: fictionalThoughts[0] })
  state = journalReducer(state, { type: 'text', field: 'helpfulThought', value: helpfulThoughtExamples[0].alternative })
  state = journalReducer(state, { type: 'next' })
  state = journalReducer(state, { type: 'back' })
  assert.equal(state.thought, 'Everything is my fault.')
  assert.equal(state.helpfulThought, 'I can care about what happened without being responsible for everything.')
  state = journalReducer(state, { type: 'text', field: 'helpfulThought', value: 'A fictional edited thought.' })
  assert.equal(state.helpfulThought, 'A fictional edited thought.')
})

test('a newly mounted journal starts empty and shares no mutable state with an old session', () => {
  let oldSession = journalReducer(createJournalState(), { type: 'emotion', value: 'Worried' })
  for (const field of ['thought', 'reflection', 'helpfulThought', 'supportPlan']) {
    oldSession = journalReducer(oldSession, { type: 'text', field, value: 'Fictional demo content' })
  }
  const fresh = createJournalState()
  assert.deepEqual(fresh, { step: 0, emotions: [], thought: '', reflection: '', helpfulThought: '', supportPlan: '' })
  assert.notEqual(fresh.emotions, oldSession.emotions)
})
