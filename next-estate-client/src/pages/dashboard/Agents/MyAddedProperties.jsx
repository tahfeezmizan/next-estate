import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const MyAddedProperties = () => {
    const { user, isLoading } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: property = [] } = useQuery({
        queryKey: ["myproperty"],
        enabled: !isLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/properties/${user?.email}`);
            return res.data;
        }
    });
    
    useEffect(() => {
        const deleteAllProperties = async () => {
            for (const { _id } of property) {
                await axiosSecure.delete(`/properties/${_id}`);
            }
            refetch();
        };

        if (property?.fraud) {
            deleteAllProperties();
        }
    }, [property, axiosSecure, refetch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/properties/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    return (
        <div className="w-full md:w-5/6 mx-auto py-10 mt-10 px-3 md:px-0">
            <Helmet>
                <title>My Added Properties - Next Estate Real Estate React Template</title>
            </Helmet>
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">My Added All Properties<span className="bg-primaryColor px-3 ml-2 rounded-full text-lg font-Roboto text-white">{property.length}</span></h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor capitalize text-center text-white text-lg">
                        <tr>
                            <th></th>
                            <th>Property Image</th>
                            <th>Property Title</th>
                            <th>Property Location</th>
                            <th>Agent Name</th>
                            <th>Agent Email</th>
                            <th>Status</th>
                            <th>Price Range</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            property?.map((property, index) => (
                                <tr key={property._id}>
                                    <th>{index + 1}</th>
                                    <td><img src={property?.image} className="w-20 mx-auto" alt="" /></td>
                                    <td>{property?.title}</td>
                                    <td>{property?.location}</td>
                                    <td>{property?.agentname}</td>
                                    <td>{property?.agentemail}</td>
                                    <td>{property?.verification_status}</td>
                                    <td><span>${property?.minprice}</span> - <span>${property?.maxprice}</span></td>
                                    <td>
                                        {
                                            property?.verification_status === 'verified' || property?.verification_status === 'pending' ?
                                            <Link to={`/dashboard/updateproperties/${property?._id}`} className="text-3xl hover:text-primaryColor btn"><FaRegEdit /></Link> : ''
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(property?._id)}
                                            className="text-3xl hover:text-primaryColor btn">
                                            <MdDeleteOutline />
                                        </button>
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

export default MyAddedProperties;
