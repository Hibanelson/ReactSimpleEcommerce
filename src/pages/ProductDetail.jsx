import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../state/cartSlice.js'
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const PRODUCT_URL = 'https://dummyjson.com/products'

export function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    let cancelled = false

    async function loadProduct() {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(`${PRODUCT_URL}/${id}`)
        if (cancelled) return
        setProduct(response.data)
      } catch {
        if (!cancelled) {
          setError('Unable to load product details.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProduct()

    return () => {
      cancelled = true
    }
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    for (let i = 0; i < quantity; i += 1) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        }),
      )
    }
    navigate('/cart')
  }

  if (loading) {
    return (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <CircularProgress size={20} />
        <Typography variant="body2">Loading product...</Typography>
      </Stack>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (!product) {
    return <Alert severity="error">Product not found.</Alert>
  }

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back to products
      </Button>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card elevation={3} sx={{ p: 2, borderRadius: 3 }}>
            <CardMedia
              component="img"
              image={product.thumbnail}
              alt={product.title}
              sx={{ height: 320, objectFit: 'contain' }}
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="overline" color="text.secondary">
            {product.category}
          </Typography>
          <Typography variant="h5" color="primary.main" fontWeight={700} sx={{ mt: 1 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5 }}>
            {product.description}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 2.5 }} useFlexGap flexWrap="wrap">
            <Chip label={`Brand: ${product.brand ?? 'N/A'}`} />
            <Chip label={`Rating: ${product.rating} stars`} />
            <Chip label={`Stock: ${product.stock}`} />
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <ButtonGroup size="small" variant="outlined">
              <Button onClick={() => setQuantity((q) => Math.max(1, Math.min(10, q - 1)))}>
                -
              </Button>
              <Button disabled>{quantity}</Button>
              <Button onClick={() => setQuantity((q) => Math.max(1, Math.min(10, q + 1)))}>
                +
              </Button>
            </ButtonGroup>

            <Button variant="contained" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

