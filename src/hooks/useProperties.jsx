import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useProperties = () => {
    const [data, setData] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/property')
        .then(res => {
            setData(res.data);
        })
    }, []);
    return [data]
};

export default useProperties;