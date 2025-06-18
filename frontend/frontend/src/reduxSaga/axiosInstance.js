import axios from "axios";
import store from "./store";
import { setGlobalError } from "./errorSlice";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth/notes",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("the token is ",token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "An unexpected error occurred";

    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }
    store.dispatch(setGlobalError(message));
    return Promise.reject(error);
  }
);

export default API;
