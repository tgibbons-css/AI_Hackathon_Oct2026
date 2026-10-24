export type SupportCategory = 'family-addiction' | 'violence' | 'grief' | 'separation' | 'trauma-stress' | 'substance-recovery'
export type MeetingFormat = 'online' | 'in-person' | 'hybrid'
export type FacilitationType = 'peer-led' | 'trained-facilitator' | 'clinician-led'
export interface SupportGroup {
  id: string
  name: string
  organization: string
  description: string
  categories: SupportCategory[]
  minAge: number
  maxAge: number
  format: MeetingFormat
  location: string
  coverage: 'duluth' | 'national' | 'other-us'
  facilitation: FacilitationType
  costLabel: string
  officialUrl?: string
  verified: boolean
  lastVerified?: string
  isDemo: boolean
}

export const supportCategories: { id: SupportCategory; name: string; description: string }[] = [
  { id: 'family-addiction', name: 'Family Addiction', description: 'For young people affected by a parent, sibling, friend, or other person struggling with alcohol or drug use.' },
  { id: 'violence', name: 'Violence or Shootings', description: 'For youth affected by school shootings, community violence, assault, or witnessing a violent event.' },
  { id: 'grief', name: 'Grief and Loss', description: 'For youth grieving the death of a family member, friend, or another important person.' },
  { id: 'separation', name: 'Family Separation', description: 'For youth seeking connection while living far from family, experiencing displacement, foster care, relocation, or related challenges. Living far from family is not inherently traumatic.' },
  { id: 'trauma-stress', name: 'Stress and Trauma Recovery', description: 'For youth who want help managing trauma-related stress or who would prefer a more general group.' },
  { id: 'substance-recovery', name: 'Substance Use Recovery', description: 'For youth seeking peer support for their own substance use recovery.' },
]

export const formatLabels: Record<MeetingFormat, string> = { online: 'Online', 'in-person': 'In person', hybrid: 'Hybrid · online and in person' }
export const facilitationLabels: Record<FacilitationType, string> = { 'peer-led': 'Peer-led', 'trained-facilitator': 'Trained adult facilitator', 'clinician-led': 'Clinician-led' }
export const demoLabel = 'Demo listing — Not a real meeting'

type DemoInput = Omit<SupportGroup, 'isDemo' | 'verified' | 'organization' | 'location'>
function demo(group: DemoInput): SupportGroup {
  return { ...group, isDemo: true, verified: false, organization: 'Fictional community program', location: group.coverage === 'duluth' ? 'Duluth / Northeastern Minnesota (demo coverage)' : group.coverage === 'other-us' ? 'Elsewhere in the United States (demo coverage)' : 'United States / Online (demo coverage)' }
}

export const supportGroups: SupportGroup[] = [
  demo({ id: 'teen-family', name: 'Teen Family Connections', description: 'A sample space for teens to connect with others affected by someone else’s alcohol or drug use.', categories: ['family-addiction'], minAge: 13, maxAge: 17, format: 'hybrid', coverage: 'duluth', facilitation: 'trained-facilitator', costLabel: 'Free (demo)' }),
  demo({ id: 'youth-violence', name: 'Youth Violence Recovery Circle', description: 'A fictional, adult-guided group focused on connection and everyday coping after violence, without requiring anyone to describe events.', categories: ['violence', 'trauma-stress'], minAge: 13, maxAge: 17, format: 'in-person', coverage: 'duluth', facilitation: 'clinician-led', costLabel: 'No-cost example' }),
  demo({ id: 'healing-loss', name: 'Healing After Loss', description: 'A sample community for young people navigating grief, with space for different feelings and ways of remembering.', categories: ['grief'], minAge: 13, maxAge: 24, format: 'in-person', coverage: 'duluth', facilitation: 'trained-facilitator', costLabel: 'Free (demo)' }),
  demo({ id: 'far-home', name: 'Far From Home Connections', description: 'A fictional connection group for teens navigating separation, relocation, or changes in who they live with.', categories: ['separation'], minAge: 13, maxAge: 17, format: 'online', coverage: 'national', facilitation: 'trained-facilitator', costLabel: 'Free (demo)' }),
  demo({ id: 'resilience', name: 'Youth Resilience Circle', description: 'A sample group for practicing everyday coping and finding connection around stress, with no need to share personal events.', categories: ['trauma-stress'], minAge: 13, maxAge: 24, format: 'hybrid', coverage: 'duluth', facilitation: 'clinician-led', costLabel: 'Cost varies (fictional example)' }),
  demo({ id: 'adult-recovery', name: 'Young Adults in Recovery', description: 'A fictional peer-led community for young adults supporting one another in their own substance use recovery.', categories: ['substance-recovery'], minAge: 18, maxAge: 24, format: 'in-person', coverage: 'duluth', facilitation: 'peer-led', costLabel: 'Free (demo)' }),
  demo({ id: 'teen-grief', name: 'Online Teen Grief Connection', description: 'A sample online group where teens can find connection with others navigating the loss of someone important.', categories: ['grief'], minAge: 13, maxAge: 17, format: 'online', coverage: 'national', facilitation: 'trained-facilitator', costLabel: 'Free (demo)' }),
  demo({ id: 'adult-family', name: 'Young Adult Family Support', description: 'A fictional peer group for young adults affected by alcohol or drug use in their family or close relationships.', categories: ['family-addiction'], minAge: 18, maxAge: 24, format: 'online', coverage: 'national', facilitation: 'peer-led', costLabel: 'Free (demo)' }),
  demo({ id: 'children-grief', name: 'Growing Through Grief', description: 'A fictional, adult-facilitated group for younger children experiencing grief and loss.', categories: ['grief'], minAge: 6, maxAge: 12, format: 'in-person', coverage: 'duluth', facilitation: 'trained-facilitator', costLabel: 'Free (demo)' }),
  demo({ id: 'children-family', name: 'Younger Family Connections', description: 'A sample, adult-guided group for younger children affected by someone else’s alcohol or drug use.', categories: ['family-addiction'], minAge: 8, maxAge: 12, format: 'online', coverage: 'national', facilitation: 'trained-facilitator', costLabel: 'Free (demo)' }),
  demo({ id: 'adult-separation', name: 'New Roots Connection', description: 'A fictional group for young adults seeking connection while navigating displacement, relocation, or distance from family.', categories: ['separation', 'trauma-stress'], minAge: 18, maxAge: 24, format: 'in-person', coverage: 'other-us', facilitation: 'trained-facilitator', costLabel: 'Free (demo)' }),
  demo({ id: 'teen-recovery', name: 'Teen Recovery Connections', description: 'A sample clinician-led peer support setting for older teens navigating their own substance use recovery.', categories: ['substance-recovery'], minAge: 16, maxAge: 17, format: 'online', coverage: 'national', facilitation: 'clinician-led', costLabel: 'Cost information not available (demo)' }),
]
