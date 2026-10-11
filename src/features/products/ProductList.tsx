import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchProducts } from './productsSlice'
import {
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from './productsSelectors'
import ProductCard from './ProductCard'

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const status = useAppSelector(selectProductsStatus)
  const error = useAppSelector(selectProductsError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <div className="status-container" data-testid="loading-spinner">
        <div className="spinner" aria-label="Đang tải sản phẩm...">
          <div className="spinner__ring"></div>
        </div>
        <p className="status-text">Đang tải sản phẩm...</p>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="status-container status-container--error" data-testid="error-message">
        <div className="error-icon">⚠️</div>
        <p className="status-text">Lỗi: {error}</p>
        <button
          id="retry-fetch"
          className="btn btn--primary"
          onClick={() => dispatch(fetchProducts())}
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <section aria-label="Danh sách sản phẩm">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductList
