import { useState } from 'react'
import { Button, Paper, Typography } from '@mui/material'
import { PageHeader } from '../components/PageHeader'
import { InfoAlert } from '../components/InfoAlert'
import { SupportCategorySelector } from '../components/support/SupportCategorySelector'
import { SupportFilters } from '../components/support/SupportFilters'
import { SupportGroupCard } from '../components/support/SupportGroupCard'
import { SupportGroupDetails } from '../components/support/SupportGroupDetails'
import { EstablishedOrganizations } from '../components/support/EstablishedOrganizations'
import { defaultPreferences, filterSupportGroups, type SupportPreferences } from '../components/support/filterSupportGroups'
import { supportGroups, type SupportCategory, type SupportGroup } from '../data/supportGroups'
import '../components/support/support.css'

export function SupportPage() {
  const [selected, setSelected] = useState<SupportCategory[]>([])
  const [preferences, setPreferences] = useState<SupportPreferences>({ ...defaultPreferences })
  const [details, setDetails] = useState<SupportGroup | null>(null)
  const matches = filterSupportGroups(supportGroups, selected, preferences)
  return <div className="support-page">
    <PageHeader title="Find Support" description="You don't have to face everything alone. Explore communities where people understand experiences like yours." eyebrow="CONNECTION · AT YOUR OWN PACE" />
    <div className="support-intro"><InfoAlert>Peer support groups offer connection with people who have shared experiences. Some are facilitated by trained adults or clinicians. Peer support is not the same as professional trauma therapy.</InfoAlert></div>
    <section className="support-section" aria-labelledby="support-topics-heading">
      <Typography component="h2" variant="h2" id="support-topics-heading" sx={{ fontSize: '1.7rem', mb: 1 }}>1. Choose a support topic</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>Choose one or more topics, or leave them unselected to explore all samples. Results can match any selected topic. You never need to explain your experiences.</Typography>
      <SupportCategorySelector selected={selected} onChange={setSelected} />
    </section>
    <Paper component="section" aria-labelledby="support-preferences-heading" variant="outlined" className="support-filter-panel">
      <Typography component="h2" variant="h2" id="support-preferences-heading" sx={{ fontSize: '1.7rem', mb: 3 }}>2. Choose your preferences</Typography>
      <SupportFilters value={preferences} onChange={setPreferences} />
      <Button onClick={() => { setSelected([]); setPreferences({ ...defaultPreferences }) }} sx={{ mt: 1 }}>Reset topics and filters</Button>
    </Paper>
    <section className="support-section" aria-labelledby="support-results-heading">
      <Typography component="h2" variant="h2" id="support-results-heading" sx={{ fontSize: '1.7rem', mb: 1 }}>3. Explore matching demonstrations</Typography>
      <Typography role="status" aria-live="polite" color="text.secondary" sx={{ mb: 2 }}>{matches.length} matching demo {matches.length === 1 ? 'listing' : 'listings'}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Every listing below is fictional. Ages, facilitation, costs, and coverage illustrate possible group types; they do not describe available meetings. For children and teens, look for adult-facilitated programs and check their supervision and participation requirements with a trusted adult.</Typography>
      {matches.length ? <div className="support-results">{matches.map(group => <SupportGroupCard group={group} onDetails={setDetails} key={group.id} />)}</div>
        : <InfoAlert>We couldn't find a matching demonstration group. You can change your filters or explore established organizations.</InfoAlert>}
    </section>
    <EstablishedOrganizations />
    <SupportGroupDetails group={details} onClose={() => setDetails(null)} />
  </div>
}
