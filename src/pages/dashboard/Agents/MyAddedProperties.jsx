import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAddedProperties = () => {
    // const [myproperty, refetch] = useMyProperties()
    const { user, isLoading } = UseAuth();
    console.log('agent email', user?.email);
    const axiosSecure = useAxiosSecure();

    const { refetch, data: property = [] } = useQuery({
        queryKey: ["myproperty"],
        enabled: !isLoading && !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/properties/${user?.email}`)
            return res.data
        }
    });

    console.log(property);

    return (
        <div>
            <h2 className="text-5xl">{property.length}</h2>
        </div>
    );
};

export default MyAddedProperties;
