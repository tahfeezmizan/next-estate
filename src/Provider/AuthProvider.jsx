import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import axios from "axios";
import { BASE_URL } from "../constant";


export const AuthContext = createContext(null);

// social login
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

    // update user 
    const userProfileUpdate = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    // save user 
    const saveUser = async user => {
        const newUser = {
            name: user?.displayName,
            email: user?.email,
            role: "guest",
            fruad: false,
        }
        const { data } = await axios.put(`${BASE_URL}/user`, newUser);
        return data;
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
                console.log(currentUser);
                setUser(currentUser);
                saveUser(currentUser);
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
        userProfileUpdate,
        logOut
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;