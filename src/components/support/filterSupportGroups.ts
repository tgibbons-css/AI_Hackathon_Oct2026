import type { SupportCategory, SupportGroup } from '../../data/supportGroups'

export type AgeGroup = 'any' | 'under-13' | '13-17' | '18-24'
export type SupportPreferences = { age: AgeGroup; format: 'either' | 'online' | 'in-person'; location: 'anywhere' | 'duluth' }
export const defaultPreferences: SupportPreferences = { age: 'any', format: 'either', location: 'anywhere' }
const ageRanges: Record<AgeGroup, [number, number]> = { any: [0, 24], 'under-13': [0, 12], '13-17': [13, 17], '18-24': [18, 24] }

export function filterSupportGroups(groups: SupportGroup[], categories: SupportCategory[], preferences: SupportPreferences) {
  const [minAge, maxAge] = ageRanges[preferences.age]
  return groups.filter(group => {
    const topicMatch = categories.length === 0 || group.categories.some(category => categories.includes(category))
    const ageMatch = group.minAge <= maxAge && group.maxAge >= minAge
    const formatMatch = preferences.format === 'either' || group.format === preferences.format || group.format === 'hybrid'
    // Anywhere includes all US samples; Duluth also includes nationwide online access.
    const locationMatch = preferences.location === 'anywhere' || group.coverage === 'duluth' || (group.coverage === 'national' && group.format !== 'in-person')
    return topicMatch && ageMatch && formatMatch && locationMatch
  })
}
