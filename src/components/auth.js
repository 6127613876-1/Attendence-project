import { useState } from "react";
import { auth, googleprovider } from "../config/firebase";
import { signInWithPopup, createUserWithEmailAndPassword ,signOut} from "firebase/auth";

export const Auth = () => {
    const[Email,setEmail]=useState("");
    const[Password,setPassword]=useState("");
    const signIn = async () =>{
        try{
       await createUserWithEmailAndPassword(auth,Email,Password)
        }
        catch(err)
        {
            console.error(err)
        }
    };
    console.log(auth?.currentUser?.email);
    const signIngoogle = async () => {
        try{
        await signInWithPopup(auth,googleprovider);
        }
        catch(err)
        {
            console.error(err);
        }
    };
    const logout = async () => {
        try{
        await signOut(auth);
        }
        catch(err)
        {
            console.error(err);
        }
    };
    return(
        <div>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign in</button>
            <button onClick={signIngoogle}>Signin with google</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};