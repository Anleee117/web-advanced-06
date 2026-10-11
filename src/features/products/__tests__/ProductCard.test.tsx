import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../test-utils'
import ProductCard from '../ProductCard'
import { useFavoritesStore } from '../../favorites/favoritesStore'
import type { Product } from '../productsSlice'

const mockProduct: Product = {
  id: 10,
  title: 'Giày Chạy Bộ Nike',
  price: 120.5,
  description: 'Giày thể thao cao cấp',
  category: 'shoes',
  image: 'nike.jpg',
  rating: { rate: 4.9, count: 320 },
}

describe('ProductCard Component (Integration Tests with RTL)', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ items: [] })
  })

  test('25. Hien thi dung thong tin san pham (ten, gia, danh muc, rating)', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Giày Chạy Bộ Nike')).toBeInTheDocument()
    expect(screen.getByText('shoes')).toBeInTheDocument()
    expect(screen.getByText('$120.50')).toBeInTheDocument()
    expect(screen.getByText('4.9')).toBeInTheDocument()
    expect(screen.getByText('(320)')).toBeInTheDocument()
  })

  test('26. Them san pham vao gio hang va doi text nut thanh "Thêm nữa"', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<ProductCard product={mockProduct} />, {
      preloadedState: {
        cart: { items: [] },
      },
    })

    const addBtn = screen.getByRole('button', { name: /Thêm vào giỏ hàng/i })
    expect(addBtn).toBeInTheDocument()

    await user.click(addBtn)

    expect(store.getState().cart.items).toHaveLength(1)
    expect(store.getState().cart.items[0].id).toBe(10)

    // Re-render UI state button update check
    expect(screen.getByRole('button', { name: /Thêm thêm vào giỏ/i })).toHaveTextContent(/Thêm nữa/i)
  })

  test('27. Nhan nut tim de them/bo san pham khoi danh sach yeu thich', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProductCard product={mockProduct} />)

    const favBtn = screen.getByRole('button', { name: /Thêm vào yêu thích/i })
    await user.click(favBtn)

    expect(useFavoritesStore.getState().isFavorite(10)).toBe(true)
    expect(screen.getByRole('button', { name: /Bỏ yêu thích/i })).toBeInTheDocument()

    await user.click(favBtn)
    expect(useFavoritesStore.getState().isFavorite(10)).toBe(false)
  })
})
