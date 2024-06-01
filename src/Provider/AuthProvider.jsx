import { createContext } from "react";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const singUpUser = () => {

    }

    const authValue = {

    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;