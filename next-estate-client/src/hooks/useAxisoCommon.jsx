import axios from "axios";
import { BASE_URL } from "../constant";

export const axiosCommon = axios.create({
    baseURL: `${BASE_URL}`
});

const useAxisoCommon = () => {
    return axiosCommon;
};

export default useAxisoCommon;