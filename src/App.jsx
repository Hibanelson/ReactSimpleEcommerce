import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { ProductDashboard } from './pages/ProductDashboard.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { ProductDetail } from './pages/ProductDetail.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductDashboard />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          {/* Optional: keep URLs clean if user types /home */}
          <Route path="home" element={<Navigate to="/" replace />} />
          {/* Catch-all back to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
