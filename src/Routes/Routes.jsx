import {
    createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../pages/Home/Home/Home";
import AllProperties from "../pages/Shared/AllProperties/AllProperties";
import SingIn from "../pages/SingIn/SingIn";
import SingUp from "../pages/SingUp/SingUp";


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
                element: <AllProperties />
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
]);