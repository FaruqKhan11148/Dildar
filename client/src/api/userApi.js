import API from './axios';

// AUTH
export const userLogin = (data) => API.post('/user/login', data);
export const userRegister = (data) => API.post('/user/signup', data);

// ORDERS (PUBLIC / BASIC)
export const createOrder = (data) => API.post('/orders', data);

// 🔐 PROTECTED ROUTES (IMPORTANT)
export const getOrderById = (id) =>
  API.get(`/orders/me/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });

export const getMyOrders = () =>
  API.get('/orders/my', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });