import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import UseAuth from '../hooks/useAuth';

const Dashboard = () => {
    const { user } = UseAuth()
    const isAdmin = true;
    const isAgent = false;

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                <div className="flex justify-end items-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Menu</label>
                </div>
                <Outlet></Outlet>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu p-4 w-80 min-h-full bg-base-200  text-base-content">
                    <NavLink to="/" className="text-xl uppercase Sitelogo">
                        {/* <img src={siteLogo} className="w-40" alt="" /> */}
                        <h1 className="text-3xl font-Merriweather">next estate</h1>
                    </NavLink>

                    {
                        isAdmin ? <>
                            {/* <li><Link to="/dashboard/myprofile">Agent Profil</Link></li>
                            <li><Link to="/dashboard/wishlist">Add Property</Link></li>
                            <li><Link to="/dashboard/propertybought">My added properties</Link></li>
                            <li><Link to="/dashboard/myreviews">My sold properties</Link></li>
                            <li><Link to="/dashboard/myreviews">Requested properties</Link></li> */}
                            <li><Link to="/dashboard/myprofile">Admin Profile</Link></li>
                            <li><Link to="/dashboard/wishlist">Manage Properties</Link></li>
                            <li><Link to="/dashboard/manageusers">Manage Users</Link></li>
                            <li><Link to="/dashboard/myreviews">Manage reviews</Link></li>
                        </>
                            :
                            <>
                                <li><Link to="/dashboard/myprofile">My Profile</Link></li>
                                <li><Link to="/dashboard/wishlist">Wishlist</Link></li>
                                <li><Link to="/dashboard/propertybought">Property Bought</Link></li>
                                <li><Link to="/dashboard/myreviews">My Reviews</Link></li>
                            </>
                    },

                </ul>
            </div>
        </div>
    );
};

export default Dashboard;