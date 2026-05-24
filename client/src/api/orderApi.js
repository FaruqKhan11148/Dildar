import API from './axios';

// CREATE order
export const createOrder = (data) => API.post('/orders', data);

// GET all orders (admin dashboard use)
export const getOrders = () => API.get('/admin/orders');

// GET single order (order tracking page)
export const getOrderById = (id) => API.get(`/orders/${id}`);

// UPDATE order status (admin action)
export const updateOrderStatus = (id, status) =>
  API.put(`/admin/orders/${id}/status`, { status });
  