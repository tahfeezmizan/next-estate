import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import verified from '../../../assets/slider/verifid.png';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useWishlist from "../../../hooks/useWishlist";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const [wishlist, refetch] = useWishlist();
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
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
                axiosSecure.delete(`/wishlist/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch(),
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
        <div>
            <div className="max-w-full">
                <h1 className="text-5xl">Wishlist {wishlist.length}</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-primaryColor text-center capitalize text-white text-xl">
                            <tr>
                                <th></th>
                                <th>image</th>
                                <th>title</th>
                                <th>location</th>
                                <th>agent image</th>
                                <th>agent name</th>
                                <th>price range</th>
                                <th>offer</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                wishlist?.map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td><img src={item?.image} className="w-20 mx-auto" alt="" /></td>
                                    <td> <div className="flex items-center gap-2">
                                        <h3>{item?.title}</h3>
                                        {
                                            item?.verification_status === 'verified' && <img className='w-6 ' src={verified} alt="" />
                                        }
                                    </div></td>
                                    <td>{item?.location}</td>
                                    <td><img src={item?.agentimage} className="w-12 mx-auto" alt="" /></td>
                                    <td>{item?.agentname}</td>
                                    <td>{item?.pricerange}</td>
                                    <td><Link to={`/dashboard/makeoffer/${item?.propertyId}`} className="btn">Make an offer</Link></td>
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
        </div>
    );
};

export default Wishlist;