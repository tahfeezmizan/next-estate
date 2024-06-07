import { useQuery } from '@tanstack/react-query';
import { MdDeleteOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/useAuth';

const ManageProperties = () => {
    const { user, isLoading } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: property = [] } = useQuery({
        queryKey: ['property'],
        queryFn: async () => {
            const res = await axiosSecure.get('/property');
            return res.data;
        }
    });

    const handleStatusUpdate = (e, agentemail) => {
        e.preventDefault();
        const value = e.target.status.value;
        console.log('Selected Verification Status:', value);

        axiosSecure.put(`/propertystatus/${agentemail}`, { verification_status: value })
            .then((data) => {
                console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `Status updated successfully!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };

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
                axiosSecure.delete(`/propertie/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Item has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    return (
        <div className="w-5/6 mx-auto py-10 mt-10">
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">
                Manage All Properties
                <span className="bg-primaryColor px-3 ml-2 rounded-full text-lg font-Roboto text-white">
                    {property.length}
                </span>
            </h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor capitalize text-center text-white text-xl">
                        <tr>
                            <th></th>
                            <th>Property Title</th>
                            <th>Property Location</th>
                            <th>Agent Name</th>
                            <th>Agent Email</th>
                            <th>Price Range</th>
                            <th>Status</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {property?.map((property, index) => (
                            <tr key={property._id}>
                                <th>{index + 1}</th>
                                <td>{property.title}</td>
                                <td>{property.location}</td>
                                <td>{property.agentname}</td>
                                <td>{property.agentemail}</td>
                                <td>
                                    <span>${property.minprice}</span> - <span>${property.maxprice}</span>
                                </td>
                                <td>
                                    <button className="btn" onClick={() => document.getElementById(`modal_${property._id}`).showModal()}>
                                        {property.verification_status}
                                    </button>
                                    <dialog id={`modal_${property._id}`} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box text-center">
                                            <h3 className="font-bold text-lg mb-5 border-b pb-4">Property Verify Status!</h3>

                                            <form onSubmit={(e) => handleStatusUpdate(e, property.agentemail)}>
                                                <select name='status' className="select select-bordered w-full max-w-xs">
                                                    <option disabled selected>{property.verification_status}</option>
                                                    
                                                    <option className='text-lg'>verified</option>
                                                    <option className='text-lg'>rejected</option>
                                                </select>

                                                <div className="modal-action justify-center">
                                                    <button type="submit" className='btn mr-5 px-8'>Confirm</button>
                                                    <button type="button" onClick={() => document.getElementById(`modal_${property._id}`).close()} className="btn ml-5 px-8">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </dialog>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(property._id)} className="text-3xl">
                                        <MdDeleteOutline />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperties;
