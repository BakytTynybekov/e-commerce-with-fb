import { createContext, useState } from "react";
import * as firebaseApp from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const GeneralAuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const sigUpwithEmailAndPassword = async (email, password) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        firebaseApp.auth,
        email,
        password
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(firebaseApp.auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const newUser = await signInWithEmailAndPassword(
        firebaseApp.auth,
        email,
        password
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  onAuthStateChanged(firebaseApp.auth, (createdUser) => {
    setUser(createdUser);
  });

  const data = {
    sigUpwithEmailAndPassword: sigUpwithEmailAndPassword,
    user: user,
    logOut: logOut,
    loginWithEmail: loginWithEmail,
  };

  return (
    <GeneralAuthContext.Provider value={data}>
      {children}
    </GeneralAuthContext.Provider>
  );
};
