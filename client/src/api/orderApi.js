import API from "./axios";

// CREATE order
export const createOrder = (data) =>
  API.post("/api/orders", data);

// GET all orders
export const getOrders = () =>
  API.get("/api/orders");

// GET orders by shop
export const getOrdersByShop = (shopId) =>
  API.get(`/api/orders/shop/${shopId}`);

// UPDATE order status
export const updateOrderStatus = (id, status) =>
  API.put(`/api/orders/${id}/status`, { status });