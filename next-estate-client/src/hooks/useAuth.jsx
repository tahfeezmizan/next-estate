import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const UseAuth = () => {
    const allContextData = useContext(AuthContext);
    return allContextData
};

export default UseAuth;