import {
    createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../pages/Home/Home/Home";
import AllProperties from "../pages/Shared/AllProperties/AllProperties";
import SingIn from "../pages/SingIn/SingIn";
import SingUp from "../pages/SingUp/SingUp";
import Properties from "../pages/Properties/Properties";
import PageBanner from "../pages/Shared/PageBanner/PageBanner";
import PropertiesDetails from "../pages/Shared/AllProperties/PropertiesDetails";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../pages/dashboard/User/MyProfile";
import Wishlist from "../pages/dashboard/User/Wishlist";
import MyReviews from "../pages/dashboard/User/MyReviews";
import MakeOffer from "../pages/dashboard/User/MakeOffer";
import PropertyBought from "../pages/dashboard/User/PropertyBought";
import ManageUsers from "../pages/dashboard/Admin/ManageUsers";


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
            // user profile
            {
                path: "myprofile",
                element: <MyProfile />
            },
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

        ]
    }
]);