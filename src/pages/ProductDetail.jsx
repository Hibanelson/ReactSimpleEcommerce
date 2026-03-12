import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../state/CartContext.jsx'

const PRODUCT_URL = 'https://dummyjson.com/products'

export function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

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
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    }
    navigate('/cart')
  }

  if (loading) {
    return <div className="status-message">Loading product…</div>
  }

  if (error) {
    return <div className="status-message error">{error}</div>
  }

  if (!product) {
    return <div className="status-message error">Product not found.</div>
  }

  return (
    <section className="product-detail">
      <button
        type="button"
        className="secondary-link"
        onClick={() => navigate(-1)}
      >
        ← Back to products
      </button>

      <div className="product-detail-layout">
        <div className="product-detail-image-card">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-detail-category">{product.category}</p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-meta">
            <span>Brand: {product.brand}</span>
            <span>Rating: {product.rating}⭐</span>
            <span>Stock: {product.stock}</span>
          </div>

          <div className="product-detail-actions">
            <div className="cart-item-qty">
              <button
                type="button"
                className="qty-button"
                onClick={() =>
                  setQuantity((q) => Math.max(1, Math.min(10, q - 1)))
                }
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                type="button"
                className="qty-button"
                onClick={() =>
                  setQuantity((q) => Math.max(1, Math.min(10, q + 1)))
                }
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

