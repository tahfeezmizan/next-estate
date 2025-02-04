import axios from "axios";

export const axiosCommon = axios.create({
    baseURL: `https://next-estate-green.vercel.app`
});

const useAxiosCommon = () => {
    return axiosCommon;
};

export default useAxiosCommon;
