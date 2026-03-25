import { useDispatch } from 'react-redux'
import { changeQuantity, removeFromCart } from '../state/cartSlice.js'
import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  ButtonGroup,
  Button,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export function CartItem({ item }) {
  const dispatch = useDispatch()

  const lineTotal = item.price * item.quantity

  return (
    // Card: Material surface container to hold all cart item content
    <Card
      elevation={2}
      sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 3 }}
    >
      {/* CardMedia: Displays the product thumbnail image */}
      <CardMedia
        component="img"
        image={item.thumbnail}
        alt={item.title}
        sx={{ width: 72, height: 72, borderRadius: 2 }}
      />
      {/* Box: Flexible container for product title and price */}
      <Box sx={{ flex: 1 }}>
        {/* Typography: Displays the product title */}
        <Typography variant="subtitle1" fontWeight={600}>
          {item.title}
        </Typography>
        {/* Typography: Displays the unit price */}
        <Typography variant="body2" color="text.secondary">
          Unit Price: ${item.price.toFixed(2)}
        </Typography>
      </Box>

      {/* ButtonGroup: Groups quantity adjustment buttons together */}
      <ButtonGroup size="small" variant="outlined">
        <Button onClick={() => dispatch(changeQuantity({ id: item.id, delta: -1 }))}>
          -
        </Button>
        <Button disabled>{item.quantity}</Button>
        <Button onClick={() => dispatch(changeQuantity({ id: item.id, delta: 1 }))}>
          +
        </Button>
      </ButtonGroup>

      {/* Stack: Vertical layout for total price display */}
      <Stack alignItems="flex-end" sx={{ minWidth: 96 }}>
        {/* Typography: Displays "Total" label */}
        <Typography variant="body2" color="text.secondary">
          Total
        </Typography>
        {/* Typography: Displays the calculated line total price */}
        <Typography variant="subtitle1" fontWeight={700}>
          ${lineTotal.toFixed(2)}
        </Typography>
      </Stack>

      {/* IconButton: Delete button to remove item from cart */}
      <IconButton
        color="error"
        aria-label="Remove from cart"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Card>
  )
}

