import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';
 
 


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
};

const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
};

const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
};

const updateUserProfile = (updateData) => {
    return updateProfile(auth.currentUser, updateData)
 }

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        console.log('state captured', currentUser?.email);
        if (currentUser?.email) {
            const user = { email: currentUser.email };
             axios.post(`${import.meta.env.VITE_API_URL}/jwt`, user, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            axios.post(`${import.meta.env.VITE_API_URL}/logout`,   {}, { withCredentials: true })
                .then(res => {
                    console.log('logout', res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    });

    return () => {
        unsubscribe();
    };
}, []);


    const authInfo = {
     user,
     loading,
     createUser,
     setUser,
     updateUserProfile,
     signIn,
     signOutUser,
     signInWithGoogle
      
    };

     

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;