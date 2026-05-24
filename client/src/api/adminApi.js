import API from './axios';

export const getOrders = () => API.get('/admin/orders');

export const updateOrderStatus = (id, status) =>
  API.put(`/admin/orders/${id}/status`, { status });

export const refundOrder = (id) =>
  API.put(`/payment/refund/${id}`);