import React, { useState } from 'react'
import { auth } from '../FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { Button, TextField, Typography } from '@mui/material'
import GoogleButton from 'react-google-button'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {
    const [Email,SetEmail]=useState('');
    const [Password,SetPassword]=useState('');

    const LoginUser=(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth,Email,Password)
        .then((userCredential)=>{
            console.log(userCredential);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const Google=()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    


  return (
        <div className='ParentContainer'>
            <div className='FormContainer'>
                <form onSubmit={LoginUser} className='AuthForm'>
                    <TextField label="Email" type='email' onChange={(e)=>{SetEmail(e.target.value)}} sx={{width:"185%"}} required />
                    <TextField label="Password" type='password' onChange={(e)=>{SetPassword(e.target.value)}} sx={{width:"185%"}} required />
                    <Button type='submit' variant='contained' sx={{margin:"6px", fontSize:"1rem"}}>Login User</Button>
                </form>

                <h1 className='or'><span className='or-text'>OR</span></h1>
                <Button sx={{marginBottom:'7px'}} onClick={()=>{Google()}}><GoogleButton/></Button>
                <Typography variant='h6'>
                    Dont have an account ? <Link to={'/SignUp'} style={{textDecoration:"none"}}>SignUp Here</Link>
                </Typography>
            </div>
        </div>
  )
  }

  export default Login
    {/* <input type='email' placeholder='Enter Email' onChange={(e)=>{SetEmail(e.target.value)}}/>
    <input type='password' placeholder='Enter Password' onChange={(e)=>{SetPassword(e.target.value)}}/>
    <button type='submit'>Login User</button> */}