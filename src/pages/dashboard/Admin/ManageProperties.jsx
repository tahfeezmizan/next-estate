import { useQuery } from '@tanstack/react-query';
import { MdDeleteOutline } from 'react-icons/md';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageProperties = () => {
    // const [data] = useProperties()
    const axiosSecure = useAxiosSecure();

    const { refetch, data: property = [] } = useQuery({
        queryKey: ['property'],
        queryFn: async () => {
            const res = await axiosSecure.get('/property')
            return res.data;
        }
    });

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
                axiosSecure.delete(`/property/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            // refetch(),
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Item has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch();
                    })
            }
        });
    }


    return (
        <div className="w-5/6 mx-auto py-10 mt-10">
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">Manage All Properties<span className="bg-primaryColor px-3 ml-2 rounded-full text-lg font-Roboto text-white">{property.length}</span></h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor capitalize text-center text-white text-xl">
                        <tr>
                            <th></th>
                            <th>property title</th>
                            <th>Property location</th>
                            <th>agent name</th>
                            <th>agent email</th>
                            <th>price range</th>
                            <th>Status</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            property?.map((property, index) => <tr key={property._id}>
                                <th>{index + 1}</th>
                                <td>{property?.title}</td>
                                <td>{property?.location}</td>
                                <td>{property?.agentname}</td>
                                <td>{property?.userEmial}</td>
                                <td><span>${property?.minprice}</span> - <span>${property?.maxprice}</span></td>
                                <td>{property?.verification_status}</td>

                                <td >
                                <button
                                        onClick={() => handleDelete(property?._id)}
                                        className="text-3xl">
                                        <MdDeleteOutline />
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperties;