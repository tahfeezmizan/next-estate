import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./useAuth";

const useWishlist = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure();

    const { refetch, data: wishlist = [] } = useQuery({
        queryKey: ["wishlist"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist/${user?.email}`)
            return res.data
        }
    })
    return [wishlist, refetch]
};

export default useWishlist;