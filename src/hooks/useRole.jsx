import UseAuth from './useAuth';
import React, { useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user, isLoading } = UseAuth()
    const axiosSecure = useAxiosSecure();

    // fetch user info using logged in user email
    const { data: role = [], isPending } = useQuery({
        queryKey: ["role", user?.email],
        enabled: !isLoading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`users/${user?.email}`)
            return data?.role;
        }
    })

    return [role, isPending];
};

export default useRole;