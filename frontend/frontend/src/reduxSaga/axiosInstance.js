import axios from 'axios'

const API=axios.create({
    baseURL:"https://note-taking-app-mern-axi4.onrender.com/api/auth/notes"
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // console.log("Sending token from interceptor:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default API;
