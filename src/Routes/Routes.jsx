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
import AddProperty from "../pages/dashboard/Agents/AddProperty";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import AgentRoutes from "./AgentRoutes/AgentRoutes";
import MyAddedProperties from "../pages/dashboard/Agents/MyAddedProperties";
import UpdateProperties from "../pages/dashboard/Agents/UpdateProperties";
import OfferedProperties from "../pages/dashboard/Agents/OfferedProperties";
import Payment from "../pages/dashboard/User/Payment";
import MySoldProperties from "../pages/dashboard/Agents/MySoldProperties";
import ErrorPage from "../pages/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout />,
        errorElement: <ErrorPage />,
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
                index: true,
                element: <PrivateRoutes><Profile /></PrivateRoutes>
            },
            {
                path: 'profile',
                element: <PrivateRoutes><Profile /></PrivateRoutes>
            },

            // user profile
            {
                path: "wishlist",
                element: <PrivateRoutes><Wishlist /></PrivateRoutes>
            },
            {
                path: "myreviews",
                element: <PrivateRoutes><MyReviews /></PrivateRoutes>
            },
            {
                path: "makeoffer/:id",
                element: <PrivateRoutes><MakeOffer /></PrivateRoutes>
            },
            {
                path: "propertybought",
                element: <PrivateRoutes><PropertyBought /></PrivateRoutes>
            },
            {
                path: "payment/:id",
                element: <PrivateRoutes><Payment /></PrivateRoutes>
            },


            // admin route 
            {
                path: "manageusers",
                element: <PrivateRoutes>
                    <AdminRoutes>
                        <ManageUsers />
                    </AdminRoutes>
                </PrivateRoutes>
            },
            {
                path: "manageproperties",
                element: <PrivateRoutes>
                    <AdminRoutes>
                        <ManageProperties />
                    </AdminRoutes>
                </PrivateRoutes>
            },
            {
                path: "managereviews",
                element:
                    <PrivateRoutes>
                        <AdminRoutes>
                            <ManageReviews />
                        </AdminRoutes>
                    </PrivateRoutes>
            },


            // agent routes
            {
                path: "addproperty",
                element:
                    <PrivateRoutes>
                        <AgentRoutes>
                            <AddProperty />
                        </AgentRoutes>
                    </PrivateRoutes>
            },
            {
                path: "myaddedproperties",
                element:
                    <PrivateRoutes>
                        <AgentRoutes>
                            <MyAddedProperties />
                        </AgentRoutes>
                    </PrivateRoutes>
            },
            {
                path: "mysoldproperties",
                element:
                    <PrivateRoutes>
                        <AgentRoutes>
                            <MySoldProperties />
                        </AgentRoutes>
                    </PrivateRoutes>
            },
            {
                path: "updateproperties/:id",
                element:
                    <PrivateRoutes>
                        <AgentRoutes>
                            <UpdateProperties />
                        </AgentRoutes>
                    </PrivateRoutes>
            },
            {
                path: "offeredproperties",
                element:
                    <PrivateRoutes>
                        <AgentRoutes>
                            <OfferedProperties />
                        </AgentRoutes>
                    </PrivateRoutes>
            },
        ]
    }
]);