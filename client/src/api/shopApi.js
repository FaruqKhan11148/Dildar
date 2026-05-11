import API from "./axios";

// GET all shops
export const getShops = () =>
  API.get("/shops");

// CREATE shop
export const createShop = (data) =>
  API.post("/shops", data);

// GET single shop
export const getShopById = (id) =>
  API.get(`/shops/${id}`);