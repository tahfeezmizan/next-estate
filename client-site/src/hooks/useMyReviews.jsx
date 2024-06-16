import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import UseAuth from './useAuth';

const useMyReviews = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: myreviews = [] } = useQuery({
        queryKey: ["myreviews"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${user?.email}`)
            return res.data
        }
    })
    return [myreviews, refetch]
};

export default useMyReviews;