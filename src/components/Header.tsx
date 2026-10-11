import React from 'react'
import { useAppSelector } from '../app/hooks'
import { selectCartCount, selectCartTotal } from '../features/cart/cartSelectors'
import { useFavoritesStore } from '../features/favorites/favoritesStore'

interface HeaderProps {
  onCartClick: () => void
  onFavClick: () => void
  cartOpen: boolean
  favOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onFavClick, cartOpen, favOpen }) => {
  const count = useAppSelector(selectCartCount)
  const total = useAppSelector(selectCartTotal)
  const favCount = useFavoritesStore((state) => state.items.length)

  return (
    <header className="header" role="banner">
      <div className="header__inner">
        <div className="header__brand">
          <span className="brand-icon">🏪</span>
          <div>
            <h1 className="brand-name">Anlee Shop</h1>
          </div>
        </div>
        <div className="header__actions">
          <button
            className={`header__btn ${favOpen ? 'header__btn--active' : ''}`}
            onClick={onFavClick}
            aria-label="Xem danh sách yêu thích"
          >
            <span>❤️</span>
            <span className="header__badge">{favCount}</span>
          </button>
          <button
            className={`header__btn ${cartOpen ? 'header__btn--active' : ''}`}
            onClick={onCartClick}
            aria-label="Xem giỏ hàng"
          >
            <span>🛒</span>
            <span className="header__badge">{count}</span>
            <span className="header__total">${total.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
