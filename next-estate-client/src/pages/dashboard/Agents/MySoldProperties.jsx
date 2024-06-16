import { Helmet } from "react-helmet";
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import verified from '../../../assets/slider/verifid.png'


const MySoldProperties = () => {
    const { user, isLoading } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: soldProperty = [] } = useQuery({
        queryKey: ["myproperty"],
        enabled: !isLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data;
        }
    });
    
    const totalPrice = soldProperty.reduce((total, item) => total + item?.soldPrice, 0);

    return (
        <div className="w-full md:w-5/6 mx-auto py-10 mt-10 px-3 md:px-0">
            <Helmet>
                <title>My Sold Properties - Next Estate Real Estate React Template</title>
            </Helmet>

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold font-Merriweather mb-5">My Sold Properties <span className="bg-primaryColor px-3 rounded-full text-lg font-Roboto text-white">{soldProperty.
                    length}</span></h1>

                <h1 className="text-2xl font-semibold font-Merriweather mb-5">Total Sold Price: <span className="px-3 font-Roboto">${totalPrice || 0}</span></h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor capitalize text-white text-xl">
                        <tr>
                            <th></th>
                            <th>Property title</th>
                            <th>Property location</th>
                            <th>Buyer name</th>
                            <th>Buyer email</th>
                            <th>Sold Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            soldProperty?.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <h3>{item?.title}</h3>
                                            {
                                                item?.verification_status === 'verified' && <img className='w-6' src={verified} alt="Verified" />
                                            }
                                        </div>
                                    </td>
                                    <td>{item?.location}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.email}</td>
                                    <td>${item?.soldPrice}</td>
                                    <td>{new Date(item?.paymentData).toLocaleDateString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySoldProperties;