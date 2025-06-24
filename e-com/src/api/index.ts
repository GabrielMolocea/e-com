import axios from 'axios';


// 1. GET /products
export const getProducts = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
  return response.data;
};

// 2. GET /products/:id
export const getProductById = async (id: number | string) => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
  return response.data;
};

// 3. GET /products/categories
export const getProductCategories = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/categories`);
  return response.data;
};

// 4. POST /auth/login
export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};