import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import verified from '../../../assets/slider/verifid.png';
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const OfferedProperties = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: property = [] } = useQuery({
        queryKey: ["property"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offered/${user?.email}`);
            return res.data;
        }
    });

    const handlePropetyAccept = (email, name, status) => {
        // console.log(email, name, status);

        axiosSecure.patch(`/offeredaccept/${email}`, { status })
            .then((data) => {
                console.log(data.data);
                if (data.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${name} is now ${status}!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.error("Error updating property status:", error);
            });
    };

    return (
        <div className="w-full md:w-5/6 mx-auto py-10 mt-10 px-3 md:px-0">
            <Helmet>
                <title>Requested Properties - Next Estate Real Estate React Template</title>
            </Helmet>
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">Clients Requested Properties <span className="bg-primaryColor px-3 rounded-full text-lg font-Roboto text-white">{property.length}</span></h1>
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
                            <th>Offer Price</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            property?.map((item, index) => (
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
                                    <td>{item?.buyerName}</td>
                                    <td>{item?.buyerEmail}</td>
                                    <td>${item?.offeredAmound}</td>
                                    <td>
                                        {
                                            item?.status === 'pending' ? (
                                                <button
                                                    onClick={() => handlePropetyAccept(item?._id, item?.agentname, 'accepted')}
                                                    className='btn btn-sm text-sm rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium uppercase'
                                                >Accept</button>
                                            ) : item?.status === 'accepted' ? (
                                                <span className="btn btn-sm px-5 bg-green-500 hover:bg-green-600 text-sm rounded-full text-white font-medium uppercase">{item?.status}</span>
                                            ) : item?.status === 'bought' ? (
                                                <span className="btn btn-sm px-5 bg-blue-600 hover:bg-blue-500 text-sm rounded-full text-white font-medium uppercase">Complete</span>
                                            ) : ''
                                        }
                                    </td>
                                    <td>
                                        {
                                            item?.status === 'pending' ? (
                                                <button
                                                    onClick={() => handlePropetyAccept(item?._id, item?.agentname, 'rejected')}
                                                    className='btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-sm rounded-full text-white font-medium uppercase'
                                                >Reject</button>
                                            ) : item?.status === 'rejected' ? (
                                                <span className="bg-red-500 hover:bg-red-600 btn btn-sm text-sm rounded-full text-white font-medium uppercase">{item?.status}</span>
                                            ) : (
                                                ""
                                            )
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OfferedProperties;
