import { create } from 'zustand'
import type { Product } from '../products/productsSlice'

export interface FavoritesState {
  items: Product[]
  addFavorite: (product: Product) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (product: Product) => void
  isFavorite: (id: number) => boolean
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: [],

  addFavorite: (product: Product) => {
    const exists = get().items.some((item) => item.id === product.id)
    if (!exists) {
      set((state) => ({ items: [...state.items, product] }))
    }
  },

  removeFavorite: (id: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },

  toggleFavorite: (product: Product) => {
    const isFav = get().isFavorite(product.id)
    if (isFav) {
      get().removeFavorite(product.id)
    } else {
      get().addFavorite(product)
    }
  },

  isFavorite: (id: number) => get().items.some((item) => item.id === id),
}))
