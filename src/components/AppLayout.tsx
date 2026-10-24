import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'
import SpaOutlined from '@mui/icons-material/SpaOutlined'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { Navigation } from './Navigation'
import { HelpDialog } from './HelpDialog'

export function AppLayout() {
  const [helpOpen, setHelpOpen] = useState(false)
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const titles: Record<string, string> = { '/': 'Home', '/calm': 'Find Calm', '/reflect': 'Reflect', '/support': 'Find Support' }
    document.title = `${titles[pathname] ?? 'Page not found'} | Steady Steps`
    mainRef.current?.focus({ preventScroll: true })
    window.scrollTo(0, 0)
  }, [pathname])
  return <div className="app-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <Container maxWidth="lg" className="header-inner">
        <Link className="brand" to="/" aria-label="Steady Steps home"><span className="brand-mark"><SpaOutlined /></span><span>Steady Steps</span></Link>
        <Navigation />
        <Button className="help-button" variant="outlined" startIcon={<FavoriteBorder />} onClick={() => setHelpOpen(true)}>Get Help Now</Button>
      </Container>
    </header>
    <Container component="main" maxWidth="lg" id="main-content" tabIndex={-1} ref={mainRef} className="main-content"><Outlet /></Container>
    <footer className="site-footer">
      <Container maxWidth="lg">
        <div className="footer-top"><span className="footer-brand"><SpaOutlined fontSize="small" /> Steady Steps</span><span>A little space to take care of you.</span></div>
        <Typography variant="body2" color="text.secondary">Steady Steps offers educational coping tools and resource information. It does not provide diagnosis, therapy, or emergency monitoring.</Typography>
      </Container>
    </footer>
    <HelpDialog open={helpOpen} onClose={() => setHelpOpen(false)} />
  </div>
}
