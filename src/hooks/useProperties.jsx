import { useEffect, useState } from "react";
import useAxisoCommon from "./useAxisoCommon";

const useProperties = () => {
    const [data, setData] = useState([]);
    const axiosCommon = useAxisoCommon();

    useEffect(() => {
        axiosCommon.get('/property')
        .then(res => {
            setData(res.data);
        })
    }, []);
    return [data]
};

export default useProperties;