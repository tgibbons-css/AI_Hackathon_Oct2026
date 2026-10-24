import { PageHeader } from '../components/PageHeader'
import { BreathingSession } from '../components/breathing/BreathingSession'

export function CalmPage() {
  return <div className="calm-page">
    <PageHeader title="Find Calm" description="Take a moment for yourself. Follow the circle at a pace that feels comfortable." eyebrow="A MOMENT AT YOUR OWN PACE" />
    <BreathingSession />
  </div>
}
