import { useSelector } from 'react-redux'
import { selectCartSummary } from '../state/cartSlice.js'
import { Button, Card, Divider, Stack, Typography } from '@mui/material'

export function CartSummary() {
  const summary = useSelector(selectCartSummary)

  return (
    <Card elevation={3} sx={{ p: 2.5, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Subtotal ({summary.totalItems} {summary.totalItems === 1 ? 'item' : 'items'})
          </Typography>
          <Typography variant="body2">${summary.subtotal.toFixed(2)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Shipping
          </Typography>
          <Typography variant="body2">${summary.shipping.toFixed(2)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Tax
          </Typography>
          <Typography variant="body2">${summary.tax.toFixed(2)}</Typography>
        </Stack>
        <Divider sx={{ my: 0.5 }} />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={700}>
            Total
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            ${summary.total.toFixed(2)}
          </Typography>
        </Stack>
      </Stack>

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

