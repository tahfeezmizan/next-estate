import axios from "axios";
import { BASE_URL } from "../constant";

export const axiosCommon = axios.create({
    baseURL: `https://next-estate-server.vercel.app`
});

const useAxiosCommon = () => {
    return axiosCommon;
};

export default useAxiosCommon;
