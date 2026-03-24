import { ProductCard } from './ProductCard.jsx'
import { Alert, Grid } from '@mui/material'

export function ProductGrid({ products, emptyMessage }) {
  if (!products.length) {
    return <Alert severity="info">{emptyMessage}</Alert>
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

