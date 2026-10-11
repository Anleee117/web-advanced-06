import React from 'react'
import { useFavoritesStore } from './favoritesStore'
import { useAppDispatch } from '../../app/hooks'
import { addToCart } from '../cart/cartSlice'
import type { Product } from '../products/productsSlice'

interface FavoritesPanelProps {
  onClose?: () => void
}

const FavoritesPanel: React.FC<FavoritesPanelProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const items = useFavoritesStore((state) => state.items)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  return (
    <aside className="favorites-panel" aria-label="Sản phẩm yêu thích">
      <div className="favorites-panel__header">
        <h2 className="favorites-panel__title">
          <span className="fav-icon">❤️</span> Yêu Thích
        </h2>
        <div className="favorites-panel__header-actions">
          <span className="favorites-badge" data-testid="fav-count">{items.length}</span>
          {onClose && (
            <button
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Đóng danh sách yêu thích"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="favorites-panel__empty">
          <div className="empty-icon">🤍</div>
          <p>Chưa có sản phẩm yêu thích</p>
          <span className="empty-hint">Bấm nút ❤️ ở từng sản phẩm để lưu lại nhé!</span>
          {onClose && (
            <button className="btn btn--primary empty-browse-btn" onClick={onClose}>
              Khám phá sản phẩm
            </button>
          )}
        </div>
      ) : (
        <ul className="favorites-list" role="list">
          {items.map((item) => (
            <li key={item.id} className="favorites-item">
              <img
                src={item.image}
                alt={item.title}
                className="favorites-item__img"
              />
              <div className="favorites-item__details">
                <p className="favorites-item__name" title={item.title}>{item.title}</p>
                <span className="favorites-item__price">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  className="btn btn--primary btn--sm fav-add-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  🛒 Thêm vào giỏ
                </button>
              </div>
              <button
                id={`remove-fav-${item.id}`}
                className="favorites-item__remove"
                onClick={() => removeFavorite(item.id)}
                aria-label={`Xoá ${item.title} khỏi yêu thích`}
                title="Xoá khỏi yêu thích"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default FavoritesPanel
