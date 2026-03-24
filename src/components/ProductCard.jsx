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
    <Card elevation={2} sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        image={product.thumbnail}
        alt={product.title}
        sx={{ height: 160, objectFit: 'cover', bgcolor: '#e2e8f0' }}
      />
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} noWrap>
          {product.title}
        </Typography>
        <Typography variant="subtitle2" color="primary.main" fontWeight={700}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0, px: 2, pb: 2, justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={handleViewDetails}>
          View Details
        </Button>
        <Stack direction="row" spacing={0.5}>
          <IconButton
            color={isFavorite ? 'error' : 'default'}
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((prev) => !prev)}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton color="error" aria-label="Remove product">
            <DeleteOutlineIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  )
}

