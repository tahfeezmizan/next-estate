import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useState } from "react";
import auth from "../Firebase/Firebase.config";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    // create new user
    const singUpUser = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //login user
    const singIn = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const authValue = {
        singIn,
        singUpUser,
        isLoading,
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;