import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";


export const AuthContext = createContext(null);

// social login
const googleProvider = new GoogleAuthProvider();

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

    // google 
    const googleLogin = () => {
        setIsLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    // sing out user
    const logOut = () => {
        setUser(null);
        signOut(auth)
    }

    // User Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
            setIsLoading(false)
        });
        return () => unsubscribe();
    }, [])

    const authValue = {
        user,
        singIn,
        singUpUser,
        googleLogin,
        isLoading,
        logOut
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;