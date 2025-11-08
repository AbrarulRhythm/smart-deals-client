import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://smart-deals-server-1.onrender.com/',
});

const useAxios = () => {
    return axiosInstance;
}

export default useAxios;