import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartSummary } from '../state/cartSlice.js'

export function Layout() {
  const summary = useSelector(selectCartSummary)
  const location = useLocation()
  const navigate = useNavigate()

  const isCartRoute = location.pathname.startsWith('/cart')

  return (
    <div className="layout">
      <header className="top-nav">
        <div className="top-nav-left">
          <button
            type="button"
            className="icon-button menu-button"
            aria-label="Toggle menu"
          >
            <span className="menu-icon" />
          </button>
          <div className="brand">PROJ-DASH</div>
          <nav className="nav-links">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <button type="button" className="nav-link ghost">
              Projects
            </button>
            <NavLink to="/cart" className="nav-link cart-link">
              Cart
              <span className="cart-icon" aria-hidden="true">
                🛒
              </span>
              {summary.totalItems > 0 && (
                <span className="cart-badge">{summary.totalItems}</span>
              )}
            </NavLink>
          </nav>
        </div>
        <div className="top-nav-right">
          <button
            type="button"
            className="icon-button filter-button"
            aria-label="Filter"
          >
            ⛃
          </button>
          <button
            type="button"
            className="icon-button avatar"
            aria-label="Account"
          >
            <span className="avatar-initials">JD</span>
          </button>
          <button
            type="button"
            className="logout-button"
            onClick={() => navigate('/')}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  )
}

