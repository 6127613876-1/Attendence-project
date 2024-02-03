import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore,serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBICf892wMXPRH6_Q0NwbPnst0Ajj1wbsI",
  authDomain: "basis-63b4c.firebaseapp.com",
  projectId: "basis-63b4c",
  storageBucket: "basis-63b4c.appspot.com",
  messagingSenderId: "618732800355",
  appId: "1:618732800355:web:b78e3a9d9ae844f381ab56",
  measurementId: "G-M5RNBXHM4W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const db = getFirestore(app);
export {serverTimestamp}; 