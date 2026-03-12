import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ProductGrid } from '../components/ProductGrid.jsx'

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
    <section className="product-dashboard">
      <header className="page-header">
        <div>
          <h1>Product Dashboard</h1>
          <p className="page-subtitle">
            Browse products and add them to your cart.
          </p>
        </div>
        <div className="page-controls">
          <div className="search-wrapper">
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search"
              className="search-input"
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </header>

      {loading && <div className="status-message">Loading products…</div>}
      {error && !loading && (
        <div className="status-message error">{error}</div>
      )}

      {!loading && !error && (
        <ProductGrid
          products={filtered}
          emptyMessage="No products match your search."
        />
      )}
    </section>
  )
}

