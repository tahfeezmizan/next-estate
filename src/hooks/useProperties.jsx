import { useEffect, useState } from "react";
import useAxisoCommon from "./useAxisoCommon";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useProperties = () => {
    const [propertys, setProperty] = useState([]);
    const axiosSecure = useAxiosSecure();
    const axisoCommon = useAxisoCommon();

    const { refetch, data: property = [] } = useQuery({
        queryKey: ['property'],
        queryFn: async () => {
            const res = await axiosSecure.get('/property');
            return res.data;
        }
    })

    return [property, refetch]
};

export default useProperties;