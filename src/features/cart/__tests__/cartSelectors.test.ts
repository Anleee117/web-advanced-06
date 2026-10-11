import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  selectIsInCart,
} from '../cartSelectors'
import type { RootState } from '../../../app/store'

describe('cartSelectors (Unit Tests)', () => {
  const mockState: RootState = {
    cart: {
      items: [
        {
          id: 101,
          title: 'Giày Sneaker',
          price: 100.0,
          description: 'Giày thể thao',
          category: 'shoes',
          image: 'img.jpg',
          rating: { rate: 4.5, count: 10 },
          quantity: 2,
        },
        {
          id: 102,
          title: 'Balo Du Lịch',
          price: 50.0,
          description: 'Balo cao cấp',
          category: 'bags',
          image: 'bag.jpg',
          rating: { rate: 4.2, count: 5 },
          quantity: 1,
        },
      ],
    },
    products: {
      items: [],
      status: 'idle',
      error: null,
    },
  }

  test('8. Lay danh sach san pham trong gio hang', () => {
    const items = selectCartItems(mockState)
    expect(items).toHaveLength(2)
    expect(items[0].id).toBe(101)
  })

  test('9. Tinh tong gia tri don hang chinh xac (Total = 100*2 + 50*1 = 250)', () => {
    const total = selectCartTotal(mockState)
    expect(total).toBe(250.0)
  })

  test('10. Tinh tong so luong item trong gio hang (Count = 2 + 1 = 3)', () => {
    const count = selectCartCount(mockState)
    expect(count).toBe(3)
  })

  test('11. Kiem tra san pham da co trong gio hang hay chua', () => {
    expect(selectIsInCart(101)(mockState)).toBe(true)
    expect(selectIsInCart(999)(mockState)).toBe(false)
  })
})
