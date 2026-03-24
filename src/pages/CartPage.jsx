import { useSelector } from 'react-redux'
import { selectCartItems } from '../state/cartSlice.js'
import { CartItem } from '../components/CartItem.jsx'
import { CartSummary } from '../components/CartSummary.jsx'
import { Alert, Box, Grid, Stack, Typography } from '@mui/material'

export function CartPage() {
  const items = useSelector(selectCartItems)

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Your Shopping Cart
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review your items, adjust quantities, or remove products.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 8 }}>
          {items.length === 0 ? (
            <Alert severity="info">Your cart is empty.</Alert>
          ) : (
            <Stack spacing={1.5}>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Stack>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CartSummary />
        </Grid>
      </Grid>
    </Box>
  )
}

