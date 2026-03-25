import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { getStoredUser, setStoredUser } from '../state/authStorage.js'

export function LoginPage() {
  const navigate = useNavigate()
  const [initialUser, setInitialUser] = useState(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  })

  useEffect(() => {
    // Load auth state from localStorage once on mount.
    const user = getStoredUser()
    setInitialUser(user)
  }, [])

  useEffect(() => {
    // If already logged in, take them back to the home page.
    if (initialUser) navigate('/', { replace: true })
  }, [initialUser, navigate])

  const submitError = useMemo(() => null, [])

  const onSubmit = (data) => {
    // Save user data to localStorage.
    setStoredUser({
      email: data.email,
      createdAt: Date.now(),
    })
    navigate('/', { replace: true })
  }

  if (initialUser) {
    return (
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <CircularProgress size={22} />
          <Typography>Redirecting...</Typography>
        </Stack>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter your details to sign in. Data is stored in localStorage.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {submitError && <Alert severity="error">{submitError}</Alert>}

          <Stack spacing={2}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required.',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters.',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
              Tip: Refresh the page after login to see persisted state.
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

