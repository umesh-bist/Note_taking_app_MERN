import axios, {  AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth/notes",
   timeout: 30000,
    headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config:InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  // console.log("the token is ", token);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
 (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let message = "An unexpected error occurred";

    if (error.response?.data && typeof error.response.data === "object" && "message" in error.response.data) {
      message = (error.response.data as any).message;
    } else if (error.message) {
      message = error.message;
    }
    toast.error(message);
    return Promise.reject(error);
  }
);

export default API;
