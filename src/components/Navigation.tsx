import { NavLink } from 'react-router-dom'

const destinations = [
  { to: '/', label: 'Home' },
  { to: '/calm', label: 'Find Calm' },
  { to: '/reflect', label: 'Reflect' },
  { to: '/support', label: 'Find Support' },
]

export function Navigation() {
  return <nav className="navigation" aria-label="Main navigation">
    {destinations.map(({ to, label }) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
  </nav>
}
