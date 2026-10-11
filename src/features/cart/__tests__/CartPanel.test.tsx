import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../test-utils'
import CartPanel from '../CartPanel'
import type { Product } from '../../products/productsSlice'

const mockItem1: Product = {
  id: 1,
  title: 'Sách Lap Trinh React',
  price: 20.0,
  description: 'Sách học React',
  category: 'books',
  image: 'book.jpg',
  rating: { rate: 5, count: 10 },
}

describe('CartPanel Component (Integration Tests with RTL)', () => {
  test('20. Hien thi thong bao gio hang trong khi items bang ranh', () => {
    renderWithProviders(<CartPanel />, {
      preloadedState: {
        cart: { items: [] },
      },
    })

    expect(screen.getByRole('heading', { name: /Giỏ Hàng/i })).toBeInTheDocument()
    expect(screen.getByText(/Giỏ hàng của bạn đang trống/i)).toBeInTheDocument()
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })

  test('21. Hien thi danh sach san pham trong gio hang, so luong, va tong tien', () => {
    renderWithProviders(<CartPanel />, {
      preloadedState: {
        cart: {
          items: [{ ...mockItem1, quantity: 2 }],
        },
      },
    })

    expect(screen.getByText('Sách Lap Trinh React')).toBeInTheDocument()
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
    expect(screen.getByTestId('qty-1')).toHaveTextContent('2')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$40.00')
  })

  test('22. Tang va giam so luong san pham khi bam nut + va −', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<CartPanel />, {
      preloadedState: {
        cart: {
          items: [{ ...mockItem1, quantity: 2 }],
        },
      },
    })

    const incBtn = screen.getByRole('button', { name: /Tăng số lượng/i })
    await user.click(incBtn)

    expect(store.getState().cart.items[0].quantity).toBe(3)
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$60.00')

    const decBtn = screen.getByRole('button', { name: /Giảm số lượng/i })
    await user.click(decBtn)

    expect(store.getState().cart.items[0].quantity).toBe(2)
  })

  test('23. Xoa san pham khi nhan nut ✕', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<CartPanel />, {
      preloadedState: {
        cart: {
          items: [{ ...mockItem1, quantity: 1 }],
        },
      },
    })

    const removeBtn = screen.getByRole('button', { name: /Xoá Sách Lap Trinh React khỏi giỏ/i })
    await user.click(removeBtn)

    expect(store.getState().cart.items).toHaveLength(0)
    expect(screen.getByText(/Giỏ hàng của bạn đang trống/i)).toBeInTheDocument()
  })

  test('24. Xoa toan bo gio hang khi nhan nut "Xoá giỏ hàng"', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<CartPanel />, {
      preloadedState: {
        cart: {
          items: [{ ...mockItem1, quantity: 5 }],
        },
      },
    })

    const clearBtn = screen.getByRole('button', { name: /Xoá giỏ hàng/i })
    await user.click(clearBtn)

    expect(store.getState().cart.items).toHaveLength(0)
  })
})
