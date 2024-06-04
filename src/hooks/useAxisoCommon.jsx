import axios from "axios";

export const axiosCommon = axios.create({
    baseURL: 'http://localhost:5000'
});

const useAxisoCommon = () => {
    return axiosCommon;
};

export default useAxisoCommon;