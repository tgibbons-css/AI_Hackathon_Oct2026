import { PageHeader } from '../components/PageHeader'
import { HelpfulThoughtsJournal } from '../components/journal/HelpfulThoughtsJournal'

export function ReflectPage() {
  return <div className="journal-page">
    <PageHeader title="Helpful Thoughts Journal" description="A little space to notice a thought and explore a kinder, more balanced perspective. Share only what feels comfortable." eyebrow="REFLECT · AT YOUR OWN PACE" />
    <HelpfulThoughtsJournal />
  </div>
}
