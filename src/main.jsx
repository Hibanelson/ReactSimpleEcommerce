import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './index.css'
import App from './App.jsx'
import { store } from './state/store.js'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#64748b',
    },
    background: {
      default: '#e2e8f0',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* ThemeProvider: Applies custom Material-UI theme to all child components */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline: Normalizes default browser styles for consistent styling */}
        <CssBaseline />
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
