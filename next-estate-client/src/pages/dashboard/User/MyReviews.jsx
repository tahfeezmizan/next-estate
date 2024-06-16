import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import useMyReviews from "../../../hooks/useMyReviews";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";

const MyReviews = () => {
    const { user } = UseAuth();
    const [myreviews, refetch] = useMyReviews();
    const axiosSecure = useAxiosSecure();

    const handleDelete = () => {
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
                axiosSecure.delete(`/reviews/${user?.email}`)
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
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">My Reviews <span className="bg-primaryColor px-3 rounded-full text-lg font-Roboto text-white">{myreviews.length}</span></h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor capitalize text-center text-white text-xl">
                        <tr>
                            <th></th>
                            <th>property title</th>
                            <th>agent name</th>
                            <th>review descrip</th>
                            <th>review time</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            myreviews?.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item?.title}</td>
                                <td>{item?.agentname}</td>
                                <td>{item?.message.substring(0, 100)}</td>
                                <td>{new Date(item?.date).toLocaleDateString('en-GB')}</td>
                                <td >
                                    <button
                                        onClick={() => handleDelete(item?._id)}
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

export default MyReviews;