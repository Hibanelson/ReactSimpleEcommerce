import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function ProductCard({ product }) {
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-body">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <div className="product-footer">
        <button
          type="button"
          className="primary-button"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        <div className="product-actions">
          <button
            type="button"
            className={`icon-button heart-button${
              isFavorite ? ' active' : ''
            }`}
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((prev) => !prev)}
          >
            ♥
          </button>
          <button
            type="button"
            className="icon-button delete-button"
            aria-label="Remove product"
          >
            🗑
          </button>
        </div>
      </div>
    </article>
  )
}

