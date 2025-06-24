import {
	createSlice,
	createAsyncThunk,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { loginUser } from "../../api"; // <-- Import your helper

interface AuthState {
	token: string | null;
	status: "idle" | "loading" | "failed";
	error: string | null;
}

const initialState: AuthState = {
	token: null,
	status: "idle",
	error: null,
};

export const login = createAsyncThunk(
	"auth/login",
	async (
		{ username, password }: { username: string; password: string },
		thunkAPI
	) => {
		try {
			const data = await loginUser(username, password); // <-- Use helper
			return data.token;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			state.token = null;
		},
		setToken(state, action: PayloadAction<string | null>) {
			state.token = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = "idle";
				state.token = action.payload;
				state.error = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			});
	},
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
