import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
    },
    changeQuantity(state, action) {
      const { id, delta } = action.payload
      const item = state.items.find((entry) => entry.id === id)
      if (!item) return
      const next = item.quantity + delta
      if (next <= 0) {
        state.items = state.items.filter((entry) => entry.id !== id)
      } else {
        item.quantity = next
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, changeQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer

const selectCartState = (state) => state.cart

export const selectCartItems = (state) => selectCartState(state).items

export const selectCartSummary = createSelector([selectCartItems], (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const shipping = items.length > 0 ? 15 : 0
  const tax = subtotal > 0 ? subtotal * 0.075 : 0
  const total = subtotal + shipping + tax
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return { subtotal, shipping, tax, total, totalItems }
})

