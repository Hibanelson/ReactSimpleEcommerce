import { ProductCard } from './ProductCard.jsx'

export function ProductGrid({ products, emptyMessage }) {
  if (!products.length) {
    return <div className="status-message">{emptyMessage}</div>
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

