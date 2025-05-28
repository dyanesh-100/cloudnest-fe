import axios from 'axios'; 

const axiosInstance = axios.create({
    baseURL: 'https://cloudnest-be.vercel.app/api/v1',
    //http://localhost:3500/api/v1
    //https://cloudnest-be.vercel.app/api/v1
    withCredentials: true, // ✅ Set at instance level
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.withCredentials = true; // ✅ Also ensure per-request flag
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
