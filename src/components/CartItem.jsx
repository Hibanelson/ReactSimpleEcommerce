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
    <Card
      elevation={2}
      sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 3 }}
    >
      <CardMedia
        component="img"
        image={item.thumbnail}
        alt={item.title}
        sx={{ width: 72, height: 72, borderRadius: 2 }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Unit Price: ${item.price.toFixed(2)}
        </Typography>
      </Box>

      <ButtonGroup size="small" variant="outlined">
        <Button onClick={() => dispatch(changeQuantity({ id: item.id, delta: -1 }))}>
          -
        </Button>
        <Button disabled>{item.quantity}</Button>
        <Button onClick={() => dispatch(changeQuantity({ id: item.id, delta: 1 }))}>
          +
        </Button>
      </ButtonGroup>

      <Stack alignItems="flex-end" sx={{ minWidth: 96 }}>
        <Typography variant="body2" color="text.secondary">
          Total
        </Typography>
        <Typography variant="subtitle1" fontWeight={700}>
          ${lineTotal.toFixed(2)}
        </Typography>
      </Stack>

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

