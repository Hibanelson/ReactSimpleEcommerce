import { useCart } from '../state/CartContext.jsx'

export function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()

  const lineTotal = item.price * item.quantity

  return (
    <article className="cart-item">
      <div className="cart-item-image-wrapper">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="cart-item-image"
        />
      </div>
      <div className="cart-item-info">
        <h2 className="cart-item-title">{item.title}</h2>
        <p className="cart-item-price">Unit Price: ${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-qty">
        <button
          type="button"
          className="qty-button"
          onClick={() => updateQuantity(item.id, -1)}
        >
          −
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          type="button"
          className="qty-button"
          onClick={() => updateQuantity(item.id, 1)}
        >
          +
        </button>
      </div>
      <div className="cart-item-total">
        <span>Total:</span>
        <strong>${lineTotal.toFixed(2)}</strong>
      </div>
      <div className="cart-item-remove">
        <button
          type="button"
          className="icon-button delete-button"
          aria-label="Remove from cart"
          onClick={() => removeFromCart(item.id)}
        >
          🗑
        </button>
      </div>
    </article>
  )
}

