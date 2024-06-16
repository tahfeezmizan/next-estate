import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: review = [] } = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews')
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
                axiosSecure.delete(`/reviews/${id}`)
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
        <div className="w-full md:w-5/6 mx-auto py-10 mt-10 px-3 md:px-0">
            <Helmet>
                <title>Manage Reviews - Next Estate Real Estate React Template</title>
            </Helmet>
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">Manage All Reviews<span className="bg-primaryColor px-3 ml-2 rounded-full text-lg font-Roboto text-white">{review.length}</span></h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor capitalize text-center text-white text-xl">
                        <tr>
                            {/* ,,, and a delete button */}
                            <th></th>
                            <th>reviewer image</th>
                            <th>reviewer email</th>
                            <th>reviewer name</th>
                            <th>review</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            review?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td className='capitalize'>{user?.name}</td>
                                <td>{user?.userEmail}</td>
                                <td>{user?.userName}</td>
                                <td className="w-96">{user?.description}</td>
                                <td >
                                    <button
                                        onClick={() => handleDelete(user?._id)}
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

export default ManageReviews;