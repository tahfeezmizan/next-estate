import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: user = [] } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user}`)
            .then(res => {
                console.log(res.data);
                if (res.data?.modifiedCount) {
                    refetch()
                    toast.success(`${user.name} will be Admin`)
                }
            })
    }

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
                axiosSecure.delete(`/users/${id}`)
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
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">Manage All Users<span className="bg-primaryColor px-3 ml-2 rounded-full text-lg font-Roboto text-white">{user.length}</span></h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-primaryColor capitalize text-center text-white text-xl">
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Make Agent</th>
                            <th>Make Admin</th>
                            <th>Mark as fraud</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            user?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td className='capitalize'>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.agentname}</td>
                                <td>
                                    {
                                        user?.role === 'guest' ? <button
                                            onClick={() => handleMakeAdmin(user?._id)}
                                            className='btn'
                                        >Make Admin</button>
                                            : "admin"
                                    }
                                </td>
                                <td>{user?.pricerange}</td>
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

export default ManageUsers;