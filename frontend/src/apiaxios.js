import axios from "axios";

console.log("test", import.meta.env.VITE_BACKEND_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default api;
