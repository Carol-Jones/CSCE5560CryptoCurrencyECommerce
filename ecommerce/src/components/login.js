import React, { useRef, useState, useContext } from "react";
import { Form } from "react-bootstrap";

import { StyledTextField } from "../styles/MUIStyle";
import { InputAdornment, Box, Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import GoogleIcon from "@mui/icons-material/Google";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { EthContext } from "../context/EthContext";
import { database } from "../firebase";

export default function Login() {
  const {
    connectWalletHandler,
    accountChangedHandler,
    accountBalanceHandler,
    defaultAccount,
    userBalance,
  } = useContext(EthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, getCart, saveCart } = useAuth();
  const { loginWithGooglePopup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);

      navigate("/");
      getCart();
      await connectWalletHandler();
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  async function handleClickShowPassword(e) {
    setShowPassword(!showPassword);
  }

  async function handleGoogle(e) {
    try {
      setError("");
      setLoading(true);
      await loginWithGooglePopup();

      getCart();
      await connectWalletHandler();
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  return (
    <Box
      textAlign="center"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="login-header">
        <h3>Login</h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email">
          <StyledTextField
            label="Email"
            variant="filled"
            type="email"
            inputRef={emailRef}
            required
          ></StyledTextField>
        </Form.Group>
        <Form.Group id="password">
          <StyledTextField
            label="Password"
            variant="filled"
            required
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: "black" }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputRef={passwordRef}
          />
        </Form.Group>

        <Button
          disabled={loading}
          sx={{ width: 400 }}
          variant="contained"
          id="SignIn"
          type="submit"
        >
          Sign In
        </Button>
      </Form>
      <div>
        <p>Or Sign in With</p>
        <Button
          onClick={handleGoogle}
          sx={{ width: 400 }}
          variant="contained"
          id="googleSignIn"
          type="submit"
          startIcon={<GoogleIcon />}
        >
          Google
        </Button>
      </div>
    </Box>
  );
}
