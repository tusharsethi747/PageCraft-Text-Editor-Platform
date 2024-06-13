import React, { useState } from 'react'
import { auth } from '../FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material'
import GoogleButton from 'react-google-button'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignUp = () => {
  const [Email,SetEmail]=useState('');
  const [Password,SetPassword]=useState('');
  const navigate=useNavigate();
  const CreateUser=(e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,Email,Password)
    .then((userCredential)=>{
        console.log(userCredential);
        navigate('/');
    })
    .catch((error)=>{
        console.log(error.message);
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
    <div>
        {/* <form onSubmit={CreateUser}>
            <input type='email' placeholder='Enter your Email here' onChange={(e)=>{SetEmail(e.target.value)}}/>
            <input type='password' placeholder='Enter your Password here' onChange={(e)=>{SetPassword(e.target.value)}}/>
            <button type='submit'>CREATE ACCOUNT</button>
        </form>

        <span>
            Already have an account? <Link to={'/'}>Login Here</Link>
        </span> */}


        <div className='ParentContainer'>
            <div className='FormContainer'>
              <form onSubmit={CreateUser} className='AuthForm'>
                  <TextField label="Email" type='email' onChange={(e)=>{SetEmail(e.target.value)}} sx={{width:"185%"}} required />
                  <TextField label="Password" type='password' onChange={(e)=>{SetPassword(e.target.value)}} sx={{width:"185%"}} required />
                  <Button type='submit' variant='contained' sx={{margin:"6px", fontSize:"1rem"}}>CREATE ACCOUNT</Button>
              </form>

              <h1 className='or'><span className='or-text'>OR</span></h1>
              <Button sx={{marginBottom:'7px'}} onClick={()=>{Google()}}><GoogleButton/></Button>
              
              <Typography variant='h6'>
                Already have an account? <Link to={'/'} style={{textDecoration:"none"}}>Login Here</Link>
              </Typography>
              </div>
            </div>
    </div>
  )
}

export default SignUp