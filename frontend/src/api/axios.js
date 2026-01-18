import axios from 'axios';

// ⚠️ DIRECT LINK - NO VARIABLES
// This guarantees your live site talks to your live backend.
const api = axios.create({
  baseURL: 'https://placement-pro-api.vercel.app/api', 
});

// Add Token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;