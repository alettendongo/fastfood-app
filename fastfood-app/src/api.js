import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

export const getRestaurants = () => API.get("/restaurants");
export const getMenu = (restaurantId) => API.get(`/restaurants/${restaurantId}/menu`);
export const login = (data) => API.post("/login", data);
export const register = (data) => API.post("/register", data);

export default API;





