import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] =useState(true)
//   create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //Manage user
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,currentUser=>{
        console.log('user find',currentUser)
        setUser(currentUser)
        setLoading(false)
    });
    return () => {
        unSubscribe();
    }

  },[])
  //Sign in
  const signIn =(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password);
  }
  //Logout ouser
  const logOut =()=>{
    setLoading(true);
    return signOut(auth);
  }
  const authInfo = {
    user,
    loading,
    createUser,
    logOut,
    signIn
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
