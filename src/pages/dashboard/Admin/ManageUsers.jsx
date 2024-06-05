import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import UseAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user, isLoading } = UseAuth();

    const { refetch, data: allUser = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    });

    const handleUserRole = async (email, name, role) => {
        axiosSecure.patch(`/users/update/${email}`, { role })
            .then((data) => {
                console.log(data.data);
                if (data.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${name} is an ${role} Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    }
    
    const handleUserRole = async (email, name, role) => {
        axiosSecure.patch(`/users/update/${email}`, { role })
            .then((data) => {
                console.log(data.data);
                if (data.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${name} is an ${role} Now!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
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

    const filteredUsers = allUser.filter(user => !user.fraud);

    return (
        <div className="w-5/6 mx-auto py-10 mt-10">
            <h1 className="text-2xl font-semibold font-Merriweather mb-5">Manage All Users<span className="bg-primaryColor px-3 ml-2 rounded-full text-lg font-Roboto text-white">{filteredUsers.length}</span></h1>
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
                            filteredUsers?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td className='capitalize'>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {user?.role !== 'agent' ? <button
                                        onClick={() => handleUserRole(user?.email, user?.name, 'agent')}
                                        className='btn'
                                    >Make Agent</button>
                                        : "Agent"
                                    }
                                </td>
                                <td>
                                    {
                                        user?.role !== 'admin' ? <button
                                            onClick={() => handleUserRole(user?.email, user?.name, 'admin')}
                                            // onClick={() => setUserRole('admin')}
                                            className='btn'
                                        >Make Admin</button>
                                            : "admin"
                                    }
                                </td>
                                <td>
                                    {/* only agent  */}
                                    {user?.role === 'agent' ?
                                        <button 
                                        onClick={() => {}}
                                        className='btn'>Make Fraud</button>
                                        : ""
                                    }
                                </td>
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