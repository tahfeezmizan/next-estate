import axios from "axios";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import { BASE_URL } from "../constant";
import useAxisoCommon from "../hooks/useAxisoCommon";


export const AuthContext = createContext(null);

// social login
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const axisoCommon = useAxisoCommon();

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
                setUser(currentUser);
                // console.log(currentUser);

                const userData = { email: currentUser?.email }
                // axisoCommon.post('/jwt', userData)
                //     .then(res => {
                //         if (res.data?.token) {
                //             localStorage.setItem('access-token', res.data.token)
                //         }
                //     })
            }
            else {
                localStorage.removeItem('access-token')
            }
            setIsLoading(false);

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