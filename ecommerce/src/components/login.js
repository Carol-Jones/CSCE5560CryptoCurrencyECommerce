import React, {useRef, useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Form from "react-bootstrap/Form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



import { useAuth } from "../context/AuthContext.js";
import { FormLabel } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material"

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useAuth(); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e) {
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
                    
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
        

        <div>

        
        <Form onSubmit ={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <TextField id="outlined-basic" label ="Email" varient="filled" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlID="formBasicPassword">      
                <TextField  id="outlined-basic" label="Password" variant="filled" required
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
        </div>
        
    )
}
