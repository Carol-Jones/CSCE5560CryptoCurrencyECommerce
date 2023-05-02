import React, { useRef, useState, useContext } from "react";
import { Form } from "react-bootstrap";

import { StyledTextField } from "../styles/MUIStyle";
import { InputAdornment, Box, Button, TextField } from "@mui/material";


import { database } from "../firebase";
import { getDatabase, set, ref, update, onValue } from "firebase/database";

import { useAuth } from "../context/AuthContext.js";

import Modal from "./modal";

export default function UpdateAccount({handleAccountClose, userAddress}) {

    console.log(userAddress);

    const { getCurrentUser } = useAuth();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const zipRef = useRef();



    async function handleSubmit(e)
    {
        //e.preventDefault();

        const user = getCurrentUser();
        update(ref(database, `users/${user.uid}/address`), {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            address: addressRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            zipCode: zipRef.current.value,
            
        })
            .then(() => {
            // Data saved successfully!
            alert("Delivery Address Saved Successfully");
            })
            

            
            .catch((error) => {
            // The write failed...
            alert(error);
            });
        handleAccountClose();
    }
    
    return(

        <Box
      textAlign="center"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
       
            <div>
            <div className="login-header">
            <h3>Edit Address</h3>
          </div>
          
          <Form onSubmit={handleSubmit}>
    
            <Form.Group id="firstName">
              <StyledTextField
                label="First Name"
                variant="filled"
                type="firstName"
                inputRef={firstNameRef}
                required
              ></StyledTextField>
            </Form.Group>
    
            <Form.Group id="lastName">
              <StyledTextField
                label="Last Name"
                variant="filled"
                type="lastName"
                inputRef={lastNameRef}
                required
              />
            </Form.Group>
    
            <Form.Group id="addressRef">
              <StyledTextField
                label="Address"
                variant="filled"
                type="addressRef"
                inputRef={addressRef}
                required
              />
            </Form.Group>
    
            <Form.Group id="cityRef">
              <StyledTextField
                label="City"
                variant="filled"
                type="cityRef"
                inputRef={cityRef}
                required
              />
            </Form.Group>
    
            <Form.Group id="zipRef">
              <StyledTextField
                label="Zip"
                variant="filled"
                type="zipRef"
                inputRef={zipRef}
                required
              />
            </Form.Group>
    
            <Form.Group id="stateRef">
              <StyledTextField
                label="State"
                variant="filled"
                type="stateRef"
                inputRef={stateRef}
                required
              />
            </Form.Group>
    
            <Button
              sx={{ width: 400 }}
              variant="contained"
              id="SignIn"
              type="submit"
            >
              Save Delivery Address
            </Button>
          </Form>
          </div>

      

       
      </Box>
    )

    
}