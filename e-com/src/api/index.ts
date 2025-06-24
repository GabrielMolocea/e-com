import axios from "axios";

// 1. GET /products
export const getProducts = async () => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}/products`
		);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch products:", error);
		throw error;
	}
};

// 2. GET /products/:id
export const getProductById = async (id: number | string) => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}/products/${id}`
		);
		return response.data;
	} catch (error) {
		console.error(`Failed to fetch product with id ${id}:`, error);
		throw error;
	}
};

// 3. GET /products/categories
export const getProductCategories = async () => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}/products/categories`
		);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch product categories:", error);
		throw error;
	}
};

// 4. POST /auth/login
export const loginUser = async (username: string, password: string) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/auth/login`,
			{
				username,
				password,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Login failed:", error);
		throw error;
	}
};
