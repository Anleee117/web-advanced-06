import { useFavoritesStore } from '../favoritesStore'
import type { Product } from '../../products/productsSlice'

const mockProduct: Product = {
  id: 1,
  title: 'Đồng hồ thời trang',
  price: 150.0,
  description: 'Đồng hồ nam',
  category: 'accessories',
  image: 'watch.jpg',
  rating: { rate: 4.6, count: 45 },
}

describe('useFavoritesStore (Zustand Unit Tests)', () => {
  beforeEach(() => {
    // Reset Zustand store state
    useFavoritesStore.setState({ items: [] })
  })

  test('16. Them san pham vao danh sach yeu thich', () => {
    const { addFavorite } = useFavoritesStore.getState()
    addFavorite(mockProduct)

    const items = useFavoritesStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0].id).toBe(1)
  })

  test('17. Xoa san pham khoi danh sach yeu thich', () => {
    useFavoritesStore.setState({ items: [mockProduct] })
    const { removeFavorite } = useFavoritesStore.getState()

    removeFavorite(1)
    expect(useFavoritesStore.getState().items).toHaveLength(0)
  })

  test('18. Toggle trang thai yeu thich (Bat/Tat)', () => {
    const { toggleFavorite } = useFavoritesStore.getState()

    // Bật yêu thích (chưa có -> thêm vào)
    toggleFavorite(mockProduct)
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true)

    // Tắt yêu thích (đã có -> xoá khỏi)
    toggleFavorite(mockProduct)
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(false)
  })

  test('19. Kiem tra ham isFavorite tra ve dung hay sai', () => {
    const { isFavorite } = useFavoritesStore.getState()
    expect(isFavorite(1)).toBe(false)

    useFavoritesStore.setState({ items: [mockProduct] })
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true)
  })
})
