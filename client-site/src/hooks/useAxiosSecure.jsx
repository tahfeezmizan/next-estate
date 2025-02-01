import axios from "axios";
import { BASE_URL } from "../constant";

export const axiosSecure = axios.create({
    baseURL: `https://next-estate-server.vercel.app`
})

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;