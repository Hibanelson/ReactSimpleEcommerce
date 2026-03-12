import { useCart } from '../state/CartContext.jsx'

export function CartSummary() {
  const { summary } = useCart()

  return (
    <aside className="cart-summary">
      <h2>Order Summary</h2>
      <dl className="summary-list">
        <div className="summary-row">
          <dt>
            Subtotal ({summary.totalItems}{' '}
            {summary.totalItems === 1 ? 'item' : 'items'})
          </dt>
          <dd>${summary.subtotal.toFixed(2)}</dd>
        </div>
        <div className="summary-row">
          <dt>Shipping</dt>
          <dd>${summary.shipping.toFixed(2)}</dd>
        </div>
        <div className="summary-row">
          <dt>Tax</dt>
          <dd>${summary.tax.toFixed(2)}</dd>
        </div>
        <div className="summary-row summary-row-total">
          <dt>Total</dt>
          <dd>${summary.total.toFixed(2)}</dd>
        </div>
      </dl>
      <button
        type="button"
        className="primary-button summary-checkout"
        disabled={summary.totalItems === 0}
      >
        Checkout
      </button>
    </aside>
  )
}

