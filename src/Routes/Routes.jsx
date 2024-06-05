import {
    createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../pages/Home/Home/Home";
import Properties from "../pages/Properties/Properties";
import AllProperties from "../pages/Shared/AllProperties/AllProperties";
import PropertiesDetails from "../pages/Shared/AllProperties/PropertiesDetails";
import PageBanner from "../pages/Shared/PageBanner/PageBanner";
import SingIn from "../pages/SingIn/SingIn";
import SingUp from "../pages/SingUp/SingUp";
import ManageProperties from "../pages/dashboard/Admin/ManageProperties";
import ManageReviews from "../pages/dashboard/Admin/ManageReviews";
import ManageUsers from "../pages/dashboard/Admin/ManageUsers";
import Profile from "../pages/dashboard/Profile";
import MakeOffer from "../pages/dashboard/User/MakeOffer";
import MyReviews from "../pages/dashboard/User/MyReviews";
import PropertyBought from "../pages/dashboard/User/PropertyBought";
import Wishlist from "../pages/dashboard/User/Wishlist";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/properties',
                element: <>
                    <PageBanner></PageBanner>
                    <Properties />
                </>
            },
            {
                path: '/allproperties',
                element: <>
                    <PrivateRoutes>
                        <PageBanner />
                        <AllProperties />
                    </PrivateRoutes>
                </>
            },
            {
                path: 'properties/:id',
                element: <PrivateRoutes><PropertiesDetails /></PrivateRoutes>
            },
            {
                path: '/singin',
                element: <SingIn />
            },
            {
                path: '/singup',
                element: <SingUp />
            },
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: "profile",
                element: <Profile />
            },

            // user profile
            {
                path: "wishlist",
                element: <Wishlist />
            },
            {
                path: "myreviews",
                element: <MyReviews />
            },
            {
                path: "makeoffer/:id",
                element: <MakeOffer />
            },
            {
                path: "propertybought",
                element: <PropertyBought />
            },


            // admin route 
            {
                path: "manageusers",
                element: <ManageUsers />
            },
            {
                path: "manageproperties",
                element: <ManageProperties />
            },
            {
                path: "managereviews",
                element: <ManageReviews />
            },

        ]
    }
]);