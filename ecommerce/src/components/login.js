import React, {useRef, useState, useContext} from "react";
import { Form } from "react-bootstrap";

import { StyledTextField } from '../styles/MUIStyle';
import { IconButton, InputAdornment, Box, Button, TextField } from '@mui/material';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { EthContext } from "../context/EthContext";

export default function Login() {

    const {connectWalletHandler, accountChangedHandler, accountBalanceHandler, defaultAccount, userBalance} = useContext(EthContext)

    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useAuth(); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            console.log(emailRef.current.value)
            console.log(passwordRef.current.value)
            await login(emailRef.current.value, passwordRef.current.value);
            
        navigate('/')
        await connectWalletHandler();  
        } catch {
            setError("Failed to create an account");
            
        }
        setLoading(false);
        
    }

    async function handleClickShowPassword(e)
    {
        setShowPassword(!showPassword);
    }

    return (
        <Box textAlign='center' sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems:"center",}}>

            <Form onSubmit ={handleSubmit}>
                <Form.Group className="mb-3" id="email">
                    <StyledTextField id="outlined-basic" label ="Email" varient="filled" type="email" inputRef={emailRef} required/>
                </Form.Group>
                <Form.Group className="mb-3" id="password">      
                    <StyledTextField  id="outlined-basic" label="Password" variant="filled" required
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

                <Button  disabled={loading} sx={{ width: 400 }} variant="contained" id = "SignIn" type = "submit">
                    Sign In
                </Button>
            </Form>
        </Box>
    )
}
