import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface RatingsState {
  [productId: number]: number // productId: rating
}

const localRatings = localStorage.getItem('ratings')
const initialState: RatingsState = localRatings ? JSON.parse(localRatings) : {}

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    setRating(state, action: PayloadAction<{ productId: number; rating: number }>) {
      state[action.payload.productId] = action.payload.rating
      localStorage.setItem('ratings', JSON.stringify(state))
    },
    loadRatings(state, action: PayloadAction<RatingsState>) {
      return { ...state, ...action.payload }
    },
  },
})

export const { setRating, loadRatings } = ratingsSlice.actions
export default ratingsSlice.reducer