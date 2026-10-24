import { useEffect, useReducer, useRef } from 'react'
import { Button, Chip, Paper, Stack, Typography } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'
import LockOutlined from '@mui/icons-material/LockOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { InfoAlert } from '../InfoAlert'
import { emotions, fictionalThoughts, helpfulThoughtExamples, journalSteps, reflectionQuestions, supportSuggestions } from '../../data/journalPrompts'
import { createJournalState, journalReducer } from './journalState'
import { JournalTextField } from './JournalTextField'
import './journal.css'

export function HelpfulThoughtsJournal() {
  const [state, dispatch] = useReducer(journalReducer, undefined, createJournalState)
  const navigate = useNavigate()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)
  const { step } = state
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.scrollIntoView({ block: 'center' })
  }, [step])

  const setText = (field: 'thought' | 'reflection' | 'helpfulThought' | 'supportPlan', value: string) => dispatch({ type: 'text', field, value })
  const next = () => step === 4 ? navigate('/') : dispatch({ type: 'next' })
  const summary = [
    { label: 'Feelings you chose', value: state.emotions.join(', ') },
    { label: 'A thought you noticed', value: state.thought },
    { label: 'Your reflection', value: state.reflection },
    { label: 'Your helpful thought', value: state.helpfulThought },
  ].filter(item => item.value.trim())

  return <>
    <div className="journal-privacy"><LockOutlined fontSize="small" /><Typography variant="body2">Your reflections are only visible on this screen and are not saved.</Typography></div>
    <Paper variant="outlined" className="journal-panel">
      <div className="journal-progress">
        <Typography variant="body2" color="text.secondary">Step {step + 1} of 5</Typography>
        <ol className="journal-dots" aria-label="Journal progress">
          {journalSteps.map((title, index) => <li key={title} aria-current={index === step ? 'step' : undefined} className={index <= step ? 'reached' : ''}><span className="sr-only">Step {index + 1}: {title}{index === step ? ' (current)' : ''}</span></li>)}
        </ol>
        <Button component={Link} to="/" size="small">Exit</Button>
      </div>
      <Typography component="h2" variant="h2" ref={headingRef} tabIndex={-1} className="journal-step-title" sx={{ fontSize: { xs: '1.65rem', sm: '2rem' }, mb: 2 }}>{journalSteps[step]}</Typography>

      <div className="journal-step-content">
        {step === 0 && <>
          <Typography sx={{ mb: 2 }}>What feeling would you like to focus on today?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Choose any that fit, or skip this question. You don’t have to explain why.</Typography>
          <div className="journal-chips" role="group" aria-label="Feelings">
            {emotions.map(emotion => <Chip key={emotion} label={emotion} component="button" type="button" clickable color={state.emotions.includes(emotion) ? 'primary' : 'default'} variant={state.emotions.includes(emotion) ? 'filled' : 'outlined'} aria-pressed={state.emotions.includes(emotion)} onClick={() => dispatch({ type: 'emotion', value: emotion })} />)}
          </div>
        </>}

        {step === 1 && <>
          <Typography sx={{ mb: 2 }}>Sometimes difficult feelings come with difficult thoughts. Is there a thought you'd like to explore?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>You can use a fictional example, write a thought, or skip. There’s no need to describe an event or personal experience.</Typography>
          <JournalTextField label="A thought to explore (optional)" value={state.thought} onChange={value => setText('thought', value)} />
          <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 650, mt: 3, mb: 1 }}>Fictional examples</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>These examples may not apply to everyone. Choose one only if it feels useful, including just to try the journal.</Typography>
          <Stack spacing={1} role="group" aria-label="Fictional thoughts">
            {fictionalThoughts.map(thought => <Button key={thought} variant="outlined" className="journal-choice" aria-pressed={state.thought === thought} onClick={() => setText('thought', state.thought === thought ? '' : thought)}>{thought}</Button>)}
          </Stack>
        </>}

        {step === 2 && <>
          {state.thought.trim() && <div className="journal-thought"><Typography variant="overline">A thought to explore</Typography><Typography>{state.thought}</Typography></div>}
          <Typography sx={{ mb: 2 }}>You can consider any of these questions. There’s no need to answer them all, and you don’t have to change how you feel.</Typography>
          <ul className="journal-questions">{reflectionQuestions.map(question => <li key={question}>{question}</li>)}</ul>
          <JournalTextField label="A short reflection (optional)" value={state.reflection} onChange={value => setText('reflection', value)} helperText="You can reflect privately instead of typing. You don’t need to describe what happened." />
        </>}

        {step === 3 && <>
          <Typography sx={{ mb: 2 }}>Is there a more balanced, compassionate, and realistic way to view this thought? Choose words that feel believable to you.</Typography>
          {state.thought.trim() && <div className="journal-thought"><Typography variant="overline">The thought you noticed</Typography><Typography>{state.thought}</Typography></div>}
          <JournalTextField label="A helpful thought (optional)" value={state.helpfulThought} onChange={value => setText('helpfulThought', value)} />
          <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 650, mt: 3, mb: 1 }}>Examples to consider</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>These are fictional examples, not interpretations of your thoughts. You can choose one, edit it, or leave this step blank.</Typography>
          <Stack spacing={1.5} role="group" aria-label="Helpful thought examples">
            {helpfulThoughtExamples.map(example => <Button key={example.original} variant="outlined" className="journal-choice journal-alternative" aria-label={`Use helpful thought: ${example.alternative}`} aria-pressed={state.helpfulThought === example.alternative} onClick={() => setText('helpfulThought', state.helpfulThought === example.alternative ? '' : example.alternative)}>
              <span><span className="journal-example-label">Original</span><span className="journal-example-text">{example.original}</span><span className="journal-example-label">Alternative</span><span className="journal-example-text">{example.alternative}</span></span>
            </Button>)}
          </Stack>
        </>}

        {step === 4 && <>
          <Typography sx={{ mb: 3 }}>Thank you for taking a moment for yourself. It’s okay if your feelings haven’t changed.</Typography>
          {summary.length > 0 ? <div className="journal-summary"><Typography component="h3" variant="h6" sx={{ mb: 2 }}>Your reflection, right now</Typography><dl>{summary.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></div>
            : <InfoAlert>You can reflect privately. You don’t need to enter anything to take a moment for yourself.</InfoAlert>}
          <Typography component="h3" variant="h6" sx={{ mt: 3, mb: 2 }}>What is one small thing that could support you today?</Typography>
          <div className="journal-chips" role="group" aria-label="Small steps for today">
            {supportSuggestions.map(suggestion => <Chip key={suggestion} component="button" type="button" clickable label={suggestion} variant={state.supportPlan === suggestion ? 'filled' : 'outlined'} color={state.supportPlan === suggestion ? 'primary' : 'default'} aria-pressed={state.supportPlan === suggestion} onClick={() => setText('supportPlan', state.supportPlan === suggestion ? '' : suggestion)} />)}
          </div>
          <div style={{ marginTop: 24 }}><JournalTextField label="One small step (optional)" value={state.supportPlan} onChange={value => setText('supportPlan', value)} /></div>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
            <Button component={Link} to="/" variant="contained">Return Home</Button>
            <Button component={Link} to="/calm" variant="outlined">Try Breathing</Button>
            <Button component={Link} to="/support" variant="outlined">Explore Support Groups</Button>
          </Stack>
        </>}
      </div>

      <div className="journal-navigation" aria-label="Journal step controls">
        <Button variant="outlined" startIcon={<ArrowBack />} disabled={step === 0} onClick={() => dispatch({ type: 'back' })}>Back</Button>
        <Button onClick={next}>Skip</Button>
        <Button variant="contained" endIcon={<ArrowForward />} onClick={next}>{step === 4 ? 'Finish' : 'Next'}</Button>
      </div>
      <Typography variant="caption" color="text.secondary">{step === 4 ? 'Finish or Skip returns you home and clears this journal.' : 'Every question is optional. You can skip a step or exit at any time.'}</Typography>
    </Paper>
    <InfoAlert>This activity uses cognitive coping and helpful thinking. It is not trauma processing therapy. You never need to recount difficult events in detail.</InfoAlert>
  </>
}
