import API from "./axios";

// GET all products
export const getProducts = () => API.get("/products");

// GET latest products
export const getLatestProducts = () => API.get("/products/latest");

// GET by category
export const getByCategory = (category) =>
  API.get(`/products/category/${category}`);

// SEARCH products
export const searchProducts = (query) =>
  API.get(`/products/search?q=${query}`);

// CREATE product
export const createProduct = (data) =>
  API.post("/products", data);

// UPDATE product
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);

// DELETE product
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);