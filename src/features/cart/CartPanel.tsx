import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeFromCart, updateQuantity, clearCart } from './cartSlice'
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from './cartSelectors'

interface CartPanelProps {
  onClose?: () => void
}

const CartPanel: React.FC<CartPanelProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const count = useAppSelector(selectCartCount)

  const handleQuantityChange = (id: number, newQty: number) => {
    dispatch(updateQuantity({ id, quantity: newQty }))
  }

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (items.length === 0) {
    return (
      <aside className="cart-panel" aria-label="Giỏ hàng">
        <div className="cart-panel__header">
          <h2 className="cart-panel__title">
            <span className="cart-icon">🛒</span> Giỏ Hàng
          </h2>
          <div className="cart-panel__header-actions">
            <span className="cart-badge" data-testid="cart-count">0</span>
            {onClose && (
              <button
                className="drawer-close-btn"
                onClick={onClose}
                aria-label="Đóng giỏ hàng"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="cart-panel__empty">
          <div className="empty-icon">🛍️</div>
          <p>Giỏ hàng của bạn đang trống</p>
          <span className="empty-hint">Hãy chọn thêm sản phẩm bạn yêu thích nhé!</span>
          {onClose && (
            <button className="btn btn--primary empty-browse-btn" onClick={onClose}>
              Tiếp tục mua sắm
            </button>
          )}
        </div>
      </aside>
    )
  }

  return (
    <aside className="cart-panel" aria-label="Giỏ hàng">
      <div className="cart-panel__header">
        <h2 className="cart-panel__title">
          <span className="cart-icon">🛒</span> Giỏ Hàng
        </h2>
        <div className="cart-panel__header-actions">
          <span className="cart-badge" data-testid="cart-count">{count}</span>
          {onClose && (
            <button
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Đóng giỏ hàng"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="cart-panel__shipping-banner">
        <span>🎉 Miễn phí vận chuyển cho đơn hàng này!</span>
      </div>

      <ul className="cart-list" role="list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item__img"
            />
            <div className="cart-item__details">
              <p className="cart-item__name" title={item.title}>{item.title}</p>
              <div className="cart-item__price-row">
                <span className="cart-item__unit-price">
                  ${item.price.toFixed(2)} / cái
                </span>
              </div>
              <div className="cart-item__controls">
                <div className="qty-control">
                  <button
                    id={`dec-qty-${item.id}`}
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    aria-label="Giảm số lượng"
                  >
                    −
                  </button>
                  <span className="qty-value" data-testid={`qty-${item.id}`}>{item.quantity}</span>
                  <button
                    id={`inc-qty-${item.id}`}
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    aria-label="Tăng số lượng"
                  >
                    +
                  </button>
                </div>
                <span className="cart-item__subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
            <button
              id={`remove-${item.id}`}
              className="cart-item__remove"
              onClick={() => handleRemove(item.id)}
              aria-label={`Xoá ${item.title} khỏi giỏ`}
              title="Xoá sản phẩm"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-panel__footer">
        <div className="cart-summary">
          <div className="cart-summary__row">
            <span>Số lượng:</span>
            <strong>{count} sản phẩm</strong>
          </div>
          <div className="cart-summary__row">
            <span>Phí vận chuyển:</span>
            <span className="free-shipping">Miễn phí</span>
          </div>
          <div className="cart-summary__row cart-summary__total">
            <span>Tổng cộng:</span>
            <strong className="total-price" data-testid="cart-total">${total.toFixed(2)}</strong>
          </div>
        </div>
        <button
          id="checkout-btn"
          className="btn btn--primary btn--full btn--checkout"
        >
          <span>Tiến hành thanh toán</span>
          <span>→</span>
        </button>
        <button
          id="clear-cart-btn"
          className="btn btn--ghost btn--full"
          onClick={handleClearCart}
        >
          Xoá giỏ hàng
        </button>
      </div>
    </aside>
  )
}

export default CartPanel
