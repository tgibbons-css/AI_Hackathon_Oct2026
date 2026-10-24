import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { HomePage } from './pages/HomePage'
import { CalmPage } from './pages/CalmPage'
import { ReflectPage } from './pages/ReflectPage'
import { SupportPage } from './pages/SupportPage'
import { PlaceholderPage } from './components/PlaceholderPage'
import ExploreOutlined from '@mui/icons-material/ExploreOutlined'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="calm" element={<CalmPage />} />
        <Route path="reflect" element={<ReflectPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="*" element={<PlaceholderPage title="Let’s find your way back" description="This page isn’t here. You can return home and choose a small step that feels right for you." icon={ExploreOutlined} note="Your next step starts at home." />} />
      </Route>
    </Routes>
  )
}
