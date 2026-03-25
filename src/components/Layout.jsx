import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartSummary } from '../state/cartSlice.js'
import { clearStoredUser, getStoredUser } from '../state/authStorage.js'
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Paper,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import TuneIcon from '@mui/icons-material/Tune'

export function Layout() {
  const summary = useSelector(selectCartSummary)
  const navigate = useNavigate()
  const [user, setUser] = useState(() => getStoredUser())

  useEffect(() => {
    // Keep navbar auth state synced with localStorage changes.
    const handler = () => setUser(getStoredUser())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const initials = useMemo(() => {
    const email = user?.email ?? ''
    const part = email.split('@')[0] ?? ''
    return part
      .slice(0, 2)
      .toUpperCase()
      .padEnd(2, 'U')
  }, [user])

  const handleLogout = () => {
    clearStoredUser()
    setUser(null)
    navigate('/login')
  }

  return (
    // Container: Responsive content wrapper with maximum width
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* AppBar: Top navigation bar component */}
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{
          borderRadius: 99,
          px: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Toolbar: Horizontal layout for navigation items */}
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          {/* Box: Left side navigation items container */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* IconButton: Menu button */}
            <IconButton color="inherit" size="small">
              <MenuIcon />
            </IconButton>
            {/* Typography: Application name/logo */}
            <Typography variant="subtitle2" sx={{ letterSpacing: 1.2 }}>
              PROJ-DASH
            </Typography>
            {/* Button: Home navigation button */}
            <Button component={NavLink} to="/" variant="text" color="inherit">
              Home
            </Button>
            {/* Button: Projects navigation button */}
            <Button variant="text" color="inherit">
              Projects
            </Button>
            {/* Button: Cart navigation button with badge */}
            <Button
              component={NavLink}
              to="/cart"
              color="inherit"
              startIcon={
                <Badge badgeContent={summary.totalItems} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              }
            >
              Cart
            </Button>
          </Box>

          {/* Box: Right side navigation items container */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* IconButton: Settings button */}
            <IconButton color="inherit" size="small">
              <TuneIcon />
            </IconButton>
            {user ? (
              <>
                {/* Avatar: User profile avatar */}
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {initials}
                </Avatar>
                {/* Button: Logout button */}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Avatar: Guest profile badge */}
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  G
                </Avatar>
                {/* Button: Login link */}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Paper: Content container with elevation and padding */}
      <Paper
        elevation={3}
        sx={{ mt: 2.5, borderRadius: 3, p: { xs: 2, md: 3 }, bgcolor: '#f8fafc' }}
      >
        <Outlet />
      </Paper>
    </Container>
  )
}
