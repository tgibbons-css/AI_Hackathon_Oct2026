import { Typography } from '@mui/material'
import Air from '@mui/icons-material/Air'
import AutoStoriesOutlined from '@mui/icons-material/AutoStoriesOutlined'
import PeopleOutline from '@mui/icons-material/PeopleOutline'
import SpaOutlined from '@mui/icons-material/SpaOutlined'
import { ActivityCard } from '../components/ActivityCard'

export function HomePage() {
  return <>
    <section className="home-hero" aria-labelledby="welcome-title">
      <div className="hero-copy">
        <span className="eyebrow"><span className="tiny-dot" /> A SPACE TO PAUSE & BEGIN AGAIN</span>
        <Typography component="h1" variant="h1" id="welcome-title" sx={{ fontSize: { xs: '2.65rem', sm: '3.5rem', md: '4rem' }, mt: 2.5, mb: 3 }}>A little support,<br /><span className="teal-text">one step at a time.</span></Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 590 }}>Everyone has difficult moments. Steady Steps offers simple ways to find calm, explore your thoughts, and connect with people who understand. Choose what feels helpful today.</Typography>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="orbit orbit-outer" /><div className="orbit orbit-middle" /><div className="orbit orbit-inner"><SpaOutlined /></div><span className="art-leaf leaf-one" /><span className="art-leaf leaf-two" /><span className="art-dot" /><span className="art-caption">Room to breathe. Space to grow.</span></div>
    </section>
    <section className="activities" aria-labelledby="activities-title">
      <div className="section-title"><div><Typography component="h2" variant="h2" id="activities-title" sx={{ fontSize: { xs: '1.6rem', sm: '1.9rem' } }}>What feels helpful today?</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Start wherever you are. Go at your own pace.</Typography></div><span className="gentle-note">Small steps count.</span></div>
      <div className="activity-grid">
        <ActivityCard title="Find Calm" description="Take a moment to relax with a gentle guided breathing activity." button="Start Breathing" to="/calm" icon={Air} tone="teal" number="01" />
        <ActivityCard title="Reflect" description="Explore difficult thoughts and practice finding a more helpful perspective." button="Open Journal" to="/reflect" icon={AutoStoriesOutlined} tone="blue" number="02" />
        <ActivityCard title="Find Support" description="Explore peer support groups and connect with communities that understand your experiences." button="Explore Groups" to="/support" icon={PeopleOutline} tone="sage" number="03" />
      </div>
    </section>
    <div className="home-reassurance"><span className="reassurance-icon"><SpaOutlined fontSize="small" /></span><Typography variant="body2">No right way to feel. No rush to move forward. This is your space.</Typography></div>
  </>
}
