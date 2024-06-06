import axios from "axios";
import { BASE_URL } from "../constant";

// export const axiosSecure = axios.create({
//     baseURL: `${BASE_URL}`
// })
// const useAxiosSecure = () => {
// axiosSecure.interceptors.request.use((config) => {
//     console.log('request stop interceptors');
//     const token = localStorage.getItem('access-token');
//     config.headers.authorization(`Bearar ${token}`)

//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

// return axiosSecure
// };
export const axiosSecure = axios.create({
    baseURL: `${BASE_URL}`
})
const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;