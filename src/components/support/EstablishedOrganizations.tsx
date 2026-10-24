import { Button, Paper, Typography } from '@mui/material'
import OpenInNew from '@mui/icons-material/OpenInNew'

export const establishedOrganizations = [
  { name: 'Alateen', url: 'https://al-anon.org/newcomers/teen-corner-alateen/', description: 'Information about support for teens affected by someone else’s drinking.' },
  { name: 'Dougy Center', url: 'https://www.dougy.org/', description: 'Grief resources for children, teens, young adults, and families, with information about grief support.' },
  { name: 'National Child Traumatic Stress Network', url: 'https://www.nctsn.org/', description: 'Information and resources about child traumatic stress. This is an information resource, not a peer group.' },
  { name: 'SAMHSA FindTreatment.gov', url: 'https://findtreatment.gov/', description: 'A service discovery resource for treatment options. This is a treatment locator, not a peer group.' },
]

export function EstablishedOrganizations() {
  return <section className="established-organizations" aria-labelledby="organizations-heading">
    <Typography component="h2" variant="h2" id="organizations-heading" sx={{ fontSize: '1.8rem', mb: 2 }}>Explore Established Organizations</Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>These official websites are educational references, not confirmed local meeting listings. Programs differ in eligibility. Check the official websites for current group availability, meeting requirements, and age restrictions. Links open a new tab; your filter selections are not included.</Typography>
    <div className="organization-grid">{establishedOrganizations.map(organization => <Paper key={organization.name} variant="outlined" className="organization-card">
      <Typography component="h3" variant="h6">{organization.name}</Typography><Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>{organization.description}</Typography>
      <Button component="a" href={organization.url} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" endIcon={<OpenInNew fontSize="small" />}>Visit Official Website<span className="support-sr-only"> for {organization.name} (opens a new tab)</span></Button>
    </Paper>)}</div>
  </section>
}
