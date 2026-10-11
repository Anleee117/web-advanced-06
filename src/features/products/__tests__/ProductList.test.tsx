import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../test-utils'
import ProductList from '../ProductList'
import type { Product } from '../productsSlice'

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'San pham 1',
    price: 15.0,
    description: 'Mo ta 1',
    category: 'cat1',
    image: 'img1.jpg',
    rating: { rate: 4.0, count: 10 },
  },
  {
    id: 2,
    title: 'San pham 2',
    price: 30.0,
    description: 'Mo ta 2',
    category: 'cat2',
    image: 'img2.jpg',
    rating: { rate: 4.5, count: 20 },
  },
]

describe('ProductList Component (Integration & Async Tests)', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('28. Hien thi giao dien dang tai (spinner) khi status = "loading"', () => {
    renderWithProviders(<ProductList />, {
      preloadedState: {
        products: { items: [], status: 'loading', error: null },
      },
    })

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    expect(screen.getByText(/Đang tải sản phẩm.../i)).toBeInTheDocument()
  })

  test('29. Hien thi thong bao loi va nut Thu lai khi status = "failed"', async () => {
    const user = userEvent.setup()
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    })
    global.fetch = mockFetch as any

    renderWithProviders(<ProductList />, {
      preloadedState: {
        products: { items: [], status: 'failed', error: 'Loi ket noi server' },
      },
    })

    expect(screen.getByTestId('error-message')).toBeInTheDocument()
    expect(screen.getByText(/Lỗi: Loi ket noi server/i)).toBeInTheDocument()

    const retryBtn = screen.getByRole('button', { name: /Thử lại/i })
    await user.click(retryBtn)

    expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=12')
  })

  test('30. [ASYNC TEST] Tu dong fetch danh sach san pham va hien thi danh sach card khi khoi tao', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    })
    global.fetch = mockFetch as any

    renderWithProviders(<ProductList />, {
      preloadedState: {
        products: { items: [], status: 'idle', error: null },
      },
    })

    await waitFor(() => {
      expect(screen.getByText('San pham 1')).toBeInTheDocument()
      expect(screen.getByText('San pham 2')).toBeInTheDocument()
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })
})
