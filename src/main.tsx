import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme/theme'
import App from './App'
import './styles.css'

// Pages serves static files without an SPA fallback for nested routes.
const Router = import.meta.env.MODE === 'github-pages' ? HashRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router><App /></Router>
    </ThemeProvider>
  </React.StrictMode>,
)
