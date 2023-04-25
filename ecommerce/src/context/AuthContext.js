import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    onAuthStateChanged
} from "firebase/auth";
import { ethers } from 'ethers';
import { getDatabase, set, ref, update } from "firebase/database";
import { database } from "../firebase";

import { EthContext } from "../context/EthContext";


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
  


    function signup(email, password) {
      return createUserWithEmailAndPassword(auth,email, password)
      
    }
    
    function login(email, password) {
      return signInWithEmailAndPassword(auth,email, password)
      
    }
  
    function logout() {
      return signOut(auth)
    }
  
    function resetPassword(email) {
      return auth.sendPasswordResetEmail(email)
    }
  
    function updateUserEmail(email) {
      return updateEmail(auth.currentUser,email)
    }
  
    function updateUserPassword(password) {
      return updatePassword(currentUser,password)
    }
/*
    function getCurrentUser()
    {
      const currentUser = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        
      })
      return currentUser
    }
    */
    function getCurrentUser()
    {
      let user = auth.currentUser
      return user
    }

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setLoading(false)
        setCurrentUser(user)
        
      })
  
      return unsubscribe
    }, [])
  
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
      updateUserPassword
    }
    
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }