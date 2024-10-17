import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3500/api/v1',
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach the token as a Bearer token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
