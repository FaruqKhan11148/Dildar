import API from "./axios";

// CREATE order
export const createOrder = (data) =>
  API.post("/orders", data);

// GET all orders
export const getOrders = () =>
  API.get("/orders");

// GET orders by shop
export const getOrdersByShop = (shopId) =>
  API.get(`/orders/shop/${shopId}`);

// UPDATE order status
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}/status`, { status });