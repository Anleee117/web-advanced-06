import productsReducer, {
  fetchProducts,
  ProductsState,
  Product,
} from '../productsSlice'

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Điện thoại Smartphone',
    price: 699.99,
    description: 'Điện thoại thông minh',
    category: 'electronics',
    image: 'phone.jpg',
    rating: { rate: 4.7, count: 200 },
  },
  {
    id: 2,
    title: 'Laptop Gaming',
    price: 1299.99,
    description: 'Laptop cấu hình cao',
    category: 'electronics',
    image: 'laptop.jpg',
    rating: { rate: 4.9, count: 50 },
  },
]

describe('productsSlice & fetchProducts thunk (Unit & Async Tests)', () => {
  const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('12. Tra lai state ban dau cho productsSlice', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('13. Cap nhat status = loading khi fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type }
    const state = productsReducer(initialState, action)
    expect(state.status).toBe('loading')
    expect(state.error).toBeNull()
  })

  test('14. [ASYNC TEST] Dispatch fetchProducts thanh cong tu API duoc mock', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    })
    global.fetch = mockFetch as any

    const dispatch = jest.fn()
    const getState = jest.fn()

    const result = await fetchProducts()(dispatch, getState, undefined)

    expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=12')
    expect(result.type).toBe('products/fetchProducts/fulfilled')
    expect(result.payload).toEqual(mockProducts)

    // Reducer check
    const state = productsReducer(
      initialState,
      fetchProducts.fulfilled(mockProducts, 'requestId')
    )
    expect(state.status).toBe('succeeded')
    expect(state.items).toEqual(mockProducts)
  })

  test('15. [ASYNC TEST] Xu ly khi fetchProducts API bi loi HTTP', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })
    global.fetch = mockFetch as any

    const dispatch = jest.fn()
    const getState = jest.fn()

    const result = await fetchProducts()(dispatch, getState, undefined)

    expect(result.type).toBe('products/fetchProducts/rejected')
    expect(result.payload).toBe('HTTP error! status: 500')

    const state = productsReducer(
      initialState,
      fetchProducts.rejected(new Error(), 'requestId', undefined, 'HTTP error! status: 500')
    )
    expect(state.status).toBe('failed')
    expect(state.error).toBe('HTTP error! status: 500')
  })
})
