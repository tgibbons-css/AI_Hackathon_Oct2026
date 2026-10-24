import { Card, CardActionArea, Typography } from '@mui/material'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import { supportCategories, type SupportCategory } from '../../data/supportGroups'

export function SupportCategorySelector({ selected, onChange }: { selected: SupportCategory[]; onChange: (categories: SupportCategory[]) => void }) {
  return <div className="support-topic-grid" role="group" aria-label="Support topics">
    {supportCategories.map(category => {
      const checked = selected.includes(category.id)
      return <Card variant="outlined" className={`support-topic${checked ? ' selected' : ''}`} key={category.id}>
        <CardActionArea aria-pressed={checked} onClick={() => onChange(checked ? selected.filter(id => id !== category.id) : [...selected, category.id])}>
          <span className="support-topic-heading"><Typography component="h3" variant="h6">{category.name}</Typography>{checked ? <CheckCircleOutline color="primary" /> : <AddCircleOutline color="primary" />}</span>
          <Typography variant="body2" color="text.secondary">{category.description}</Typography>
        </CardActionArea>
      </Card>
    })}
  </div>
}
