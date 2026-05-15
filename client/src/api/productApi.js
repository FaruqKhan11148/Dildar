import API from './axios';

// GET all products
export const getProducts = () => API.get('/api/products');

// GET latest products
export const getLatestProducts = () => API.get('/api/products/latest');

// GET by category
export const getByCategory = (category) =>
  API.get(`/api/products/category/${category}`);

// SEARCH products
export const searchProducts = (query) =>
  API.get(`/api/products/search?q=${query}`);

// CREATE product
export const createProduct = (data) => API.post('/api/products', data);

// UPDATE product
export const updateProduct = (id, data) => API.put(`/api/products/${id}`, data);

// DELETE product
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);
