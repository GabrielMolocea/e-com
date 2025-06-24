import {
	createSlice,
	createAsyncThunk,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { getProducts, getProductCategories } from "../../api";

export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: { rate: number; count: number };
}

interface ProductsState {
	items: Product[];
	categories: string[];
	status: "idle" | "loading" | "failed";
	error: string | null;
	sortBy: "price" | "rating";
	filterCategory: string | null;
}

const initialState: ProductsState = {
	items: [],
	categories: [],
	status: "idle",
	error: null,
	sortBy: "price",
	filterCategory: null,
};

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (_, thunkAPI) => {
		try {
			const data = await getProducts();
			return data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(
				error.response?.data || "Failed to fetch products"
			);
		}
	}
);

export const fetchCategories = createAsyncThunk(
	"products/fetchCategories",
	async (_, thunkAPI) => {
		try {
			const data = await getProductCategories();
			return data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(
				error.response?.data || "Failed to fetch categories"
			);
		}
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = "idle";
				state.items = action.payload;
				state.error = null;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
			});
	},
});

export default productsSlice.reducer;
