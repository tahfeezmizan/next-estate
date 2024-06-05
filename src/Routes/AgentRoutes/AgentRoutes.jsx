import useRole from '../../hooks/useRole';
import { Navigate } from 'react-router-dom';

const AgentRoutes = ({children}) => {
    const [role] = useRole();
    if (role === 'agent') return children
    return <Navigate to="/dashboard" />
};

export default AgentRoutes;