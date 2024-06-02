import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";

const PrivateRoutes = ({children}) => {
    const { user, isLoading } = UseAuth();
    const location = useLocation();

    if (isLoading) {
        return <span className="loading loading-spinner text-error text-5xl"></span>
    }
    if (user) {
        return children
    }
    return <Navigate to="/singin" state={{from: location}} replace></Navigate>

};

export default PrivateRoutes;