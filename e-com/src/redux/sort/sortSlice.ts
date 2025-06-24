import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SortBy = "price" | "rating";

interface SortState {
	sortBy: SortBy;
	filterByCategory: string | null; // Allow null for compatibility with action payload
}

const initialState: SortState = {
	sortBy: "price",
	filterByCategory: "", // This will be set by the productsSlice, can be null
};

const sortSlice = createSlice({
	name: "sort",
	initialState,
	reducers: {
		setSortBy(state, action: PayloadAction<SortBy>) {
			state.sortBy = action.payload;
		},
		setSortFilterCategory(state, action: PayloadAction<string | null>) {
			// This action is defined in productsSlice, but we can use it here
			// to ensure that the filter category is set when sorting changes.
			state.filterByCategory = action.payload;
		},
	},
});

export const { setSortBy, setSortFilterCategory } = sortSlice.actions;
export default sortSlice.reducer;
