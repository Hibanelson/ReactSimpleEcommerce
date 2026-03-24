import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartSummary } from '../state/cartSlice.js'
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

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
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
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" size="small">
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle2" sx={{ letterSpacing: 1.2 }}>
              PROJ-DASH
            </Typography>
            <Button component={NavLink} to="/" variant="text" color="inherit">
              Home
            </Button>
            <Button variant="text" color="inherit">
              Projects
            </Button>
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" size="small">
              <TuneIcon />
            </IconButton>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              JD
            </Avatar>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/')}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Paper
        elevation={3}
        sx={{ mt: 2.5, borderRadius: 3, p: { xs: 2, md: 3 }, bgcolor: '#f8fafc' }}
      >
        <Outlet />
      </Paper>
    </Container>
  )
}
