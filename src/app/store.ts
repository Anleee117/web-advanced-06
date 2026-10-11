import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import productsReducer from '../features/products/productsSlice'

export const createStore = (preloadedState?: any) =>
  configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
    },
    preloadedState,
  })

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
