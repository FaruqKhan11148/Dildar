import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dildar-client.onrender.com', // change this with hosted link later
});

export default API;
