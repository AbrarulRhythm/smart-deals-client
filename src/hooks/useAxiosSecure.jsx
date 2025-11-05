import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
    const { user } = useAuth();

    // set token in the header for all the api call using axiosSecure hook
    axiosInstance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${user.accessToken}`;
        return config;
    })

    return axiosInstance;
}

export default useAxiosSecure;