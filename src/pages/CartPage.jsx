import { useCart } from '../state/CartContext.jsx'
import { CartItem } from '../components/CartItem.jsx'
import { CartSummary } from '../components/CartSummary.jsx'

export function CartPage() {
  const { items } = useCart()

  return (
    <section className="cart-page">
      <header className="page-header">
        <h1>Your Shopping Cart</h1>
        <p className="page-subtitle">
          Review your items, adjust quantities, or remove products.
        </p>
      </header>

      <div className="cart-layout">
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="status-message">Your cart is empty.</div>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>
        <CartSummary />
      </div>
    </section>
  )
}

