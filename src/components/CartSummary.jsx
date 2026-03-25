import { useSelector } from 'react-redux'
import { selectCartSummary } from '../state/cartSlice.js'
import { Button, Card, Divider, Stack, Typography } from '@mui/material'

export function CartSummary() {
  const summary = useSelector(selectCartSummary)

  return (
    // Card: Material surface container with elevated styling for the summary
    <Card elevation={3} sx={{ p: 2.5, borderRadius: 3 }}>
      {/* Typography: Displays the "Order Summary" heading */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      {/* Stack: Vertical container for summary line items */}
      <Stack spacing={1}>
        {/* Stack: Horizontal layout for subtotal display */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Subtotal ({summary.totalItems} {summary.totalItems === 1 ? 'item' : 'items'})
          </Typography>
          <Typography variant="body2">${summary.subtotal.toFixed(2)}</Typography>
        </Stack>
        {/* Stack: Horizontal layout for shipping cost display */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Shipping
          </Typography>
          <Typography variant="body2">${summary.shipping.toFixed(2)}</Typography>
        </Stack>
        {/* Stack: Horizontal layout for tax display */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Tax
          </Typography>
          <Typography variant="body2">${summary.tax.toFixed(2)}</Typography>
        </Stack>
        {/* Divider: Visual separator between line items and total */}
        <Divider sx={{ my: 0.5 }} />
        {/* Stack: Horizontal layout for final total display */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={700}>
            Total
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            ${summary.total.toFixed(2)}
          </Typography>
        </Stack>
      </Stack>

      {/* Button: Checkout button with disabled state based on cart items */}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={summary.totalItems === 0}
      >
        Checkout
      </Button>
    </Card>
  )
}

