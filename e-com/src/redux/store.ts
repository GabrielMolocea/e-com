import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import productsReducer from '../features/products/productsSlice'
import ratingsReducer from '../features/ratings/ratingsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    ratings: ratingsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch