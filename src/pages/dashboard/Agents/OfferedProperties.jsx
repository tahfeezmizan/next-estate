import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import verified from '../../../assets/slider/verifid.png'

const OfferedProperties = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: property = [] } = useQuery({
        queryKey: ["property"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/makeoffer`)
            return res.data
        }
    });


    return (
        <div className="w-5/6 mx-auto py-10 mt-10">
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">Requested Property <span className="bg-primaryColor px-3 rounded-full text-lg font-Roboto text-white">{property.length}</span></h1>
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
                            <th>offer Price</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            property?.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td> <div className="flex items-center gap-2">
                                    <h3>{item?.title}</h3>
                                    {
                                        item?.verification_status === 'verified' && <img className='w-6 ' src={verified} alt="" />
                                    }
                                </div></td>
                                <td>{item?.location}</td>
                                <td>{item?.userName}</td>
                                <td>{item?.userEmail}</td>
                                <td>${item?.offeredAmound}</td>
                                <td>
                                    {
                                        item?.status === 'pending' ? (
                                            <button
                                                onClick={() => handleUserRole(user?.email, user?.name, 'agent')}
                                                className='btn btn-sm'
                                            >{item?.status}</button>
                                        ) :
                                            'accepted'
                                    }
                                </td>
                                <td>
                                    {
                                        item?.status === 'pending' ? (
                                            <button
                                                onClick={() => handleUserRole(user?.email, user?.name, 'agent')}
                                                className='btn btn-sm'
                                            >{item?.status}</button>
                                        ) :
                                            'accepted'
                                    }
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OfferedProperties;