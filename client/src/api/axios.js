import axios from 'axios';

const API = axios.create({
  // baseURL: 'https://dildar.onrender.com/api',
  baseURL: 'https://dildar.onrender.com',
});

export default API;
