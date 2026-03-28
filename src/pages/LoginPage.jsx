// Import React hooks for managing side effects, memoization, and component state
import { useEffect, useMemo, useState } from 'react'
// Import the useNavigate hook to programmatically navigate between routes
import { useNavigate } from 'react-router-dom'
// Import useForm and Controller for managing form state and validation with react-hook-form
import { useForm, Controller } from 'react-hook-form'
// Import Material-UI components for building the login form UI
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
// Import authentication storage functions to persist and retrieve user data from localStorage
import { getStoredUser, setStoredUser } from '../state/authStorage.js'

// Main LoginPage component that handles user authentication and redirection
export function LoginPage() {
  // Get the navigation function to redirect after successful login
  const navigate = useNavigate()
  // State to track if the user was already logged in when the page loads
  // State to track if the user was already logged in when the page loads
  const [initialUser, setInitialUser] = useState(null)

  // Initialize the form with react-hook-form - manages form state, validation, and submission
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  })

  // Effect hook that runs once on component mount to load existing user data from localStorage
  useEffect(() => {
    // Load auth state from localStorage once on mount.
    const user = getStoredUser()
    setInitialUser(user)
  }, [])

  // Effect hook that redirects already-logged-in users to the home page
  useEffect(() => {
    // If already logged in, take them back to the home page.
    if (initialUser) navigate('/', { replace: true })
  }, [initialUser, navigate])

  // Memoized value for submission errors (currently set to null but kept for future error handling)
  const submitError = useMemo(() => null, [])

  // Form submission handler that saves user credentials and navigates to home page
  const onSubmit = (data) => {
    // Save user data to localStorage.
    setStoredUser({
      email: data.email,
      createdAt: Date.now(),
    })
    navigate('/', { replace: true })
  }

  // Show loading state if user is already logged in and being redirected
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

  // Main login form UI
  return (
    // Container to center the form with responsive width
    <Container maxWidth="sm" sx={{ py: 4 }}>
      // Paper component provides a elevated card-like appearance for the form
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
        // Header title for the login form
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Login
        </Typography>
        // Subtitle explaining the login purpose and data storage
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter your details to sign in. Data is stored in localStorage.
        </Typography>

        // Form wrapper that handles form submission with react-hook-form
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          // Display error alert if submission error exists
          {submitError && <Alert severity="error">{submitError}</Alert>}

          // Stack container for spacing form fields vertically
          <Stack spacing={2}>
            // Email input field with validation rules
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

            // Password input field with validation rules
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

            // Submit button that triggers form validation and submission
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

            // Helper text tip explaining the page refresh behavior
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
              Tip: Refresh the page after login to see persisted state.
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

