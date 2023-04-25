import React, { useRef, useState, useContext } from "react"
import { Form } from "react-bootstrap"

import { Link, useNavigate, useHistory } from 'react-router-dom';
import { IconButton, InputAdornment, Box, Button, TextField } from '@mui/material';
import { StyledTextField } from '../styles/MUIStyle';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {getDatabase, set, ref, update} from "firebase/database";
import {database} from "../firebase"
import { useAuth } from "../context/AuthContext"
import { EthContext } from "../context/EthContext";


export default function Signup() {
  const {connectWalletHandler, accountChangedHandler, accountBalanceHandler, defaultAccount, userBalance} = useContext(EthContext)


  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const {getCurrentUser} = useAuth()

  
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
       
      return setError("Passwords do not match")
      
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)

      const user =getCurrentUser()
      
      set(ref(database, 'users/' + user.uid), {
        email: emailRef.current.value,

       })
        .then(() => {
            // Data saved successfully!
            alert('user created successfully');

        })
        .catch((error) => {
            // The write failed...
            alert(error);
        });
    await connectWalletHandler();  
    }catch {
      
      
      
    }

    setLoading(false)
    
  }
 
  
  async function handleClickShowPassword(e)
  {
    setShowPassword(!showPassword)
  }

  return (
    <Box textAlign='center' sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems:"center",}}>
        
        
        <Form onSubmit={handleSubmit}>
      <Form.Group id="email">
        <StyledTextField label="Email" variant="filled" type="email" inputRef={emailRef} required></StyledTextField>
      </Form.Group>

      <Form.Group id="password">
        
        <StyledTextField label="Password" variant="filled" required
       type={showPassword ? "text" : "password"}
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <IconButton
               sx={{color: 'black'}}
               aria-label="toggle password visibility"
               onClick={handleClickShowPassword}
             >
               {showPassword ? <Visibility /> : <VisibilityOff />}
             </IconButton>
           </InputAdornment>
         )
         
       }}
       inputRef={passwordRef}
       />
      </Form.Group>

      <Form.Group id="password-confirm">
      <StyledTextField label="Confirm Password" variant="filled"  required
       type={showPassword ? "text" : "password"}
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <IconButton
               sx={{color: 'black'}}
               aria-label="toggle password visibility"
               onClick={handleClickShowPassword}
             >
               {showPassword ? <Visibility /> : <VisibilityOff />}
             </IconButton>
           </InputAdornment>
         )
         
       }}
       inputRef={passwordConfirmRef}
       />
        
      </Form.Group>

      
         <Button  disabled={loading} sx={{ width: 400 }} variant="contained" id = "register" type = "submit">
           Register
         </Button>
      
      
    </Form>

   
   </Box>
  )
}