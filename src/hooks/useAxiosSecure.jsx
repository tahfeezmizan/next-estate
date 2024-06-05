import axios from "axios";
import { BASE_URL } from "../constant";

export const axiosSecure = axios.create({
    baseURL: `${BASE_URL}`
})
const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;