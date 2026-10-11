import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  CartState,
} from '../cartSlice'
import type { Product } from '../../products/productsSlice'

const mockProduct1: Product = {
  id: 1,
  title: 'Áo Nam Premium',
  price: 29.99,
  description: 'Mô tả áo nam',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/1.jpg',
  rating: { rate: 4.5, count: 120 },
}

const mockProduct2: Product = {
  id: 2,
  title: 'Tai nghe Bluetooth',
  price: 49.99,
  description: 'Mô tả tai nghe',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/2.jpg',
  rating: { rate: 4.8, count: 85 },
}

describe('cartSlice reducer (Unit Tests)', () => {
  const initialState: CartState = {
    items: [],
  }

  test('1. Tra lai state ban dau khi truyen undefined action', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('2. Them san pham vao gio hang trong khi gio hang dang trong', () => {
    const nextState = cartReducer(initialState, addToCart(mockProduct1))
    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0]).toEqual({
      ...mockProduct1,
      quantity: 1,
    })
  })

  test('3. Tang so luong neu san pham da co trong gio hang', () => {
    const stateWithItem: CartState = {
      items: [{ ...mockProduct1, quantity: 1 }],
    }
    const nextState = cartReducer(stateWithItem, addToCart(mockProduct1))
    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0].quantity).toBe(2)
  })

  test('4. Xoa san pham khoi gio hang theo ID', () => {
    const stateWithItems: CartState = {
      items: [
        { ...mockProduct1, quantity: 1 },
        { ...mockProduct2, quantity: 2 },
      ],
    }
    const nextState = cartReducer(stateWithItems, removeFromCart(1))
    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0].id).toBe(2)
  })

  test('5. Cap nhat so luong san pham trong gio hang', () => {
    const stateWithItem: CartState = {
      items: [{ ...mockProduct1, quantity: 1 }],
    }
    const nextState = cartReducer(
      stateWithItem,
      updateQuantity({ id: 1, quantity: 5 })
    )
    expect(nextState.items[0].quantity).toBe(5)
  })

  test('6. Tu dong xoa san pham neu so luong cap nhat <= 0', () => {
    const stateWithItem: CartState = {
      items: [{ ...mockProduct1, quantity: 2 }],
    }
    const nextState = cartReducer(
      stateWithItem,
      updateQuantity({ id: 1, quantity: 0 })
    )
    expect(nextState.items).toHaveLength(0)
  })

  test('7. Xoa toan bo gio hang (clearCart)', () => {
    const stateWithItems: CartState = {
      items: [
        { ...mockProduct1, quantity: 2 },
        { ...mockProduct2, quantity: 1 },
      ],
    }
    const nextState = cartReducer(stateWithItems, clearCart())
    expect(nextState.items).toHaveLength(0)
  })
})
