import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: { main: '#366D6E', light: '#EAF2EF' },
    secondary: { main: '#526F96' },
    background: { default: '#FAF8F4', paper: '#FFFFFF' },
    text: { primary: '#343C43', secondary: '#59666B' },
    divider: '#E3E7E1',
  },
  typography: {
    fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 650, letterSpacing: '-0.045em', lineHeight: 1.14 },
    h2: { fontWeight: 650, letterSpacing: '-0.025em' },
    h3: { fontWeight: 650, letterSpacing: '-0.02em' },
    body1: { lineHeight: 1.8 },
    body2: { lineHeight: 1.7 },
    button: { textTransform: 'none', fontWeight: 650 },
  },
  shape: { borderRadius: 20 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { minHeight: 44, borderRadius: 12, paddingInline: 20 } } },
    MuiLink: { defaultProps: { underline: 'hover' } },
    MuiDialog: { styleOverrides: { paper: { padding: 8 } } },
  },
})
