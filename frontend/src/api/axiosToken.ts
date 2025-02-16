import axios from "axios";

const axiosToken = axios.create({
    headers: { "Content-Type": "application/json" },
});

axiosToken.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosToken;
