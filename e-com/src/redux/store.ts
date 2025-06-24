import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import productsReducer from './products/productsSlice'
import ratingsReducer from './ratings/ratingsSlice'
import sortReducer from './sort/sortSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    ratings: ratingsReducer,
    sortBy: sortReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch