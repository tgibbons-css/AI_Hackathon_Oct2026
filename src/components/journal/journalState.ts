export type JournalState = {
  step: number
  emotions: string[]
  thought: string
  reflection: string
  helpfulThought: string
  supportPlan: string
}

export function createJournalState(): JournalState {
  return { step: 0, emotions: [], thought: '', reflection: '', helpfulThought: '', supportPlan: '' }
}

type JournalAction =
  | { type: 'next' | 'back' }
  | { type: 'emotion'; value: string }
  | { type: 'text'; field: 'thought' | 'reflection' | 'helpfulThought' | 'supportPlan'; value: string }

// This reducer is local to the mounted activity. It has no persistence or side effects.
export function journalReducer(state: JournalState, action: JournalAction): JournalState {
  switch (action.type) {
    case 'next': return { ...state, step: Math.min(4, state.step + 1) }
    case 'back': return { ...state, step: Math.max(0, state.step - 1) }
    case 'emotion': return { ...state, emotions: state.emotions.includes(action.value)
      ? state.emotions.filter(emotion => emotion !== action.value) : [...state.emotions, action.value] }
    case 'text': return { ...state, [action.field]: action.value.slice(0, 600) }
  }
}
