import axios from "axios";
import { BASE_URL } from "../constant";

export const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;