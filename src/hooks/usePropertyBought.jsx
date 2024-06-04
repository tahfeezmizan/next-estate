import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./useAuth";

const usePropertyBought = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: boughtProperty = [] } = useQuery({
        queryKey: ["boughtProperty"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/makeoffer/${user?.email}`)
            return res.data
        }
    })
    return [refetch, boughtProperty]
};

export default usePropertyBought;