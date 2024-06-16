import { Navigate } from "react-router-dom";
import useRole from "../../hooks/useRole";

const AdminRoutes = ({children}) => {
    const [role] = useRole();
    if(role === 'admin') return children
    return <Navigate to="/dashboard" />
};

export default AdminRoutes;