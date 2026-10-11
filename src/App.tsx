import React, { useState } from 'react'
import ProductList from './features/products/ProductList'
import CartPanel from './features/cart/CartPanel'
import FavoritesPanel from './features/favorites/FavoritesPanel'
import Header from './components/Header'

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false)

  const handleCartClick = () => {
    setCartOpen((prev) => !prev)
    setFavOpen(false)
  }

  const handleFavClick = () => {
    setFavOpen((prev) => !prev)
    setCartOpen(false)
  }

  const handleCloseAll = () => {
    setCartOpen(false)
    setFavOpen(false)
  }

  return (
    <div className="app">
      <Header
        onCartClick={handleCartClick}
        onFavClick={handleFavClick}
        cartOpen={cartOpen}
        favOpen={favOpen}
      />

      <main className="main-layout">
        <div className="main-layout__products">
          <div className="section-header">
            <div>
              <h2 className="section-title">Danh Sách Sản Phẩm</h2>
              <p className="section-subtitle">
                Hàng chính hãng 100% • Miễn phí vận chuyển đơn từ $50 • Đổi trả trong 7 ngày
              </p>
            </div>
          </div>
          <ProductList />
        </div>

        {/* Drawer Favorites */}
        <div className={`main-layout__sidebar ${favOpen ? 'main-layout__sidebar--open' : ''}`}>
          <FavoritesPanel onClose={handleCloseAll} />
        </div>

        {/* Drawer Cart */}
        <div className={`main-layout__cart ${cartOpen ? 'main-layout__cart--open' : ''}`}>
          <CartPanel onClose={handleCloseAll} />
        </div>
      </main>

      {(cartOpen || favOpen) && (
        <div
          className="overlay"
          onClick={handleCloseAll}
          aria-hidden="true"
          data-testid="overlay"
        />
      )}
    </div>
  )
}

export default App
