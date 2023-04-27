// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase, set, ref, update } from "firebase/database";

import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1tKs272bjCivfO2Z1DpVRFFuWGQNGR_8",
  authDomain: "csce5560.firebaseapp.com",
  projectId: "csce5560",
  storageBucket: "csce5560.appspot.com",
  messagingSenderId: "399846132056",
  appId: "1:399846132056:web:7a6e9b03fc15a45ea5fd2d",
  measurementId: "G-7L7C0ZG280",
  databaseURL: "https://csce5560-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
