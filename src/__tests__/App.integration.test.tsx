import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import App from '../App'
import type { Product } from '../features/products/productsSlice'

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'San pham A',
    price: 50.0,
    description: 'Mo ta A',
    category: 'catA',
    image: 'a.jpg',
    rating: { rate: 4.5, count: 50 },
  },
]

describe('App Integration Suite', () => {
  beforeEach(() => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    })
    global.fetch = mockFetch as any
  })

  test('31. Luong nguoi dung: xem danh sach, them vao gio hang, mo gio hang va kiem tra tong tien', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    // Wait for product to load
    await waitFor(() => {
      expect(screen.getByText('San pham A')).toBeInTheDocument()
    })

    // Click "Thêm vào giỏ"
    const addBtn = screen.getByRole('button', { name: /Thêm vào giỏ hàng/i })
    await user.click(addBtn)

    // Open cart modal/sidebar
    const cartToggleBtn = screen.getByRole('button', { name: /Xem giỏ hàng/i })
    await user.click(cartToggleBtn)

    // Verify cart panel shows product and total
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$50.00')
  })
})
