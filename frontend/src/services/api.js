import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Cart
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (productId, qty = 1) => {
  const response = await api.post("/cart", { productId, qty });
  return response.data;
};

export const updateCartItem = async (id, qty) => {
  const response = await api.put(`/cart/${id}`, { qty });
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};

// Checkout
export const checkout = async (checkoutData) => {
  const response = await api.post("/checkout", checkoutData);
  return response.data;
};

export default api;
