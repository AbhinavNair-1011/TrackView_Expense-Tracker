import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const isRefreshRoute = originalRequest.url.includes('/auth/refresh-token');

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isRefreshRoute
        ) {
              originalRequest._retry = true;
           
            try {
                await api.post('/auth/refresh-token');
                return api(originalRequest);
            } catch (refreshError) {
                window.dispatchEvent(new Event("logout"));
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
export default api