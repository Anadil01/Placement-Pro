import axios from 'axios';

// --- ADD THESE 3 LINES ---
console.log("--------------------");
console.log("DEBUG: ENV VAR IS:", import.meta.env.VITE_API_URL);
console.log("--------------------");
// -------------------------

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// INTERCEPTOR: Automatically add Token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;