import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ProductGrid } from '../components/ProductGrid.jsx'
import {
  Alert,
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'

const PRODUCTS_URL = 'https://dummyjson.com/products'

export function ProductDashboard() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const searchRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function loadProducts() {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(PRODUCTS_URL, {
          signal: controller.signal,
        })
        if (cancelled) return
        const items = response.data?.products ?? []
        setProducts(items)
        setFiltered(items)
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'CanceledError') return
        setError('Failed to load products. Please try again.')
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  const handleSearchChange = () => {
    const query = searchRef.current?.value.toLowerCase() ?? ''
    if (!query) {
      setFiltered(products)
      return
    }
    setFiltered(
      products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      ),
    )
  }

  return (
    // Box: Main container for the product dashboard
    <Box>
      {/* Stack: Horizontal layout for title and search bar */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        {/* Box: Container for dashboard title and description */}
        <Box>
          {/* Typography: Displays "Product Dashboard" heading */}
          <Typography variant="h5" fontWeight={700}>
            Product Dashboard
          </Typography>
          {/* Typography: Displays dashboard description */}
          <Typography variant="body2" color="text.secondary">
            Browse products and add them to your cart.
          </Typography>
        </Box>
        {/* TextField: Search input for filtering products */}
        <TextField
          inputRef={searchRef}
          type="search"
          placeholder="Search products"
          onChange={handleSearchChange}
          size="small"
          sx={{ minWidth: { xs: '100%', sm: 260 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {loading && (
        <Stack direction="row" spacing={1.5} alignItems="center">
          {/* CircularProgress: Loading spinner component */}
          <CircularProgress size={20} />
          {/* Typography: Displays loading text */}
          <Typography variant="body2">Loading products...</Typography>
        </Stack>
      )}
      {error && !loading && (
        <Alert severity="error">{error}</Alert>
      )}

      {!loading && !error && (
        <ProductGrid
          products={filtered}
          emptyMessage="No products match your search."
        />
      )}
    </Box>
  )
}

