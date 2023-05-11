import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { provider } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { ethers } from "ethers";
import { getDatabase, set, ref, update, get, onValue } from "firebase/database";
import { database } from "../firebase";

import { EthContext } from "../context/EthContext";
import { CartContext } from "./CartContext";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { shoppingCart, setShoppingCart } = useContext(CartContext);

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function loginWithGooglePopup() {
    return signInWithPopup(auth, provider);
  }

  function loginInWithGoogleRedirect() {
    return signInWithRedirect(auth, provider);
  }

  function logout() {
    saveCart();
    console.log("bye");
    return signOut(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateUserEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password);
  }

  function getCurrentUser() {
    let user = auth.currentUser;
    return user;
  }

  function getCart() {
    const user = getCurrentUser();
    if (user) {
      //Get the cart value from firebase
      const cartRef = ref(database, `users/${user.uid}/cart`);
      console.log(cartRef);
      onValue(cartRef, (snapshot) => {
        const data = snapshot.val();
        // console.log(new Map(Object.entries(data)));
        setShoppingCart(new Map(Object.entries(data)));
      });
    }
  }

  function saveCart() {
    const user = getCurrentUser();
    if (user) {
      const cartRef = ref(database, `users/${user.uid}/cart`);
      console.log(cartRef);
      //add the shopping cart to the user
      set(cartRef, Object.fromEntries(shoppingCart));
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getCurrentUser,
    updateUserEmail,
    updateUserPassword,
    loginWithGooglePopup,
    loginInWithGoogleRedirect,
    getCart,
    saveCart,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
