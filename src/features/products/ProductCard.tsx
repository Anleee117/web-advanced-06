import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addToCart } from '../cart/cartSlice'
import { selectIsInCart } from '../cart/cartSelectors'
import { useFavoritesStore } from '../favorites/favoritesStore'
import type { Product } from './productsSlice'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch()
  const isInCart = useAppSelector(selectIsInCart(product.id))

  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product)
  }

  return (
    <article className="product-card">
      <div className="product-card__img-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__img"
          loading="lazy"
        />
        <span className="product-card__category">{product.category}</span>
        <button
          id={`fav-${product.id}`}
          className={`favorite-btn ${isFavorite ? 'favorite-btn--active' : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <div className="product-card__meta">
          <div className="product-card__rating">
            <span className="star">★</span>
            <span>{product.rating.rate}</span>
            <span className="review-count">({product.rating.count})</span>
          </div>
          <span className="product-card__price">${product.price.toFixed(2)}</span>
        </div>
      </div>
      <div className="product-card__footer">
        <button
          id={`add-to-cart-${product.id}`}
          className={`btn ${isInCart ? 'btn--in-cart' : 'btn--primary'}`}
          onClick={handleAddToCart}
          aria-label={isInCart ? 'Thêm thêm vào giỏ' : 'Thêm vào giỏ hàng'}
        >
          {isInCart ? (
            <>
              <span className="btn-icon">✓</span> Thêm nữa
            </>
          ) : (
            <>
              <span className="btn-icon">🛒</span> Thêm vào giỏ
            </>
          )}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
