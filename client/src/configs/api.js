import axios from 'axios';

const api = axios.create({
    // It will look for the production URL in your hosting provider's settings first
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// The "Interceptor" - This is pro-level practice
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;