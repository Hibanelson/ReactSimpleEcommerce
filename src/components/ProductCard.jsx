import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export function ProductCard({ product }) {
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    // Card: Material surface container for product display
    <Card elevation={2} sx={{ borderRadius: 3 }}>
      {/* CardMedia: Displays the product image */}
      <CardMedia
        component="img"
        image={product.thumbnail}
        alt={product.title}
        sx={{ height: 160, objectFit: 'cover', bgcolor: '#e2e8f0' }}
      />
      {/* CardContent: Container for product title and price */}
      <CardContent sx={{ pb: 1 }}>
        {/* Typography: Displays product title */}
        <Typography variant="subtitle1" fontWeight={600} noWrap>
          {product.title}
        </Typography>
        {/* Typography: Displays product price in primary color */}
        <Typography variant="subtitle2" color="primary.main" fontWeight={700}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      {/* CardActions: Action buttons container for view and favorite actions */}
      <CardActions sx={{ pt: 0, px: 2, pb: 2, justifyContent: 'space-between' }}>
        {/* Button: Navigates to product details page */}
        <Button variant="contained" onClick={handleViewDetails}>
          View Details
        </Button>
        {/* Stack: Horizontal layout for favorite and delete buttons */}
        <Stack direction="row" spacing={0.5}>
          {/* IconButton: Toggle favorite state on product */}
          <IconButton
            color={isFavorite ? 'error' : 'default'}
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((prev) => !prev)}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          {/* IconButton: Remove product button */}
          <IconButton color="error" aria-label="Remove product">
            <DeleteOutlineIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  )
}

