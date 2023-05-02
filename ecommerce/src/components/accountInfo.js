import { React, useState, useEffect, useContext, useRef } from "react";
import { ethers } from "ethers";
import { getDatabase, set, ref, update, onValue } from "firebase/database";
import { database } from "../firebase";
import { EthContext } from "../context/EthContext";
import { CartContext } from "../context/CartContext";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';


import { useAuth } from "../context/AuthContext";

import Modal from "./modal";
import UpdateAccount from "./updateAccountInfo";

export default function AccountInfo(){
    const { getCurrentUser } = useAuth();

    const [userAddress, setUserAddress] = useState()
    //const userAddress = getUserAddress();

    useEffect(() => {
        const user = getCurrentUser();
        const address = ref(database, `users/${user.uid}/address`);
        onValue(address, (snapshot) => {
        const data = snapshot.val();
        setUserAddress(data);
        
        });
    },[]);
    
    const [updateAccountOpen, setUpdateAccountOpen] = useState();

    const handleAccountClose = () =>
    {
        setUpdateAccountOpen(false);
    }
    return(
        <Box
        textAlign="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: 'inherit',
          width:'100%'
        }}
      >
        <div id="portal"></div>
        {userAddress && (
            <Paper elevation = {12} sx ={{borderRadius:5, width:'70%'}}>
                <Card sx ={{ borderRadius:5}}>
                    <CardHeader title="Delivery Address"></CardHeader>

                    <CardContent sx={{display:'flex',width:'80%'}}>
                        <CardContent sx={{marginLeft:4, }}>
                        
                            <Typography sx={{textAlign:"left"}}>
                                {userAddress.firstName} {userAddress.lastName} 
                            </Typography>
                            
                            <Typography sx={{textAlign:"left"}}>
                                {userAddress.address}
                            </Typography>

                            <Typography sx={{textAlign:"left"}}>
                                {userAddress.city}, {userAddress.state} {userAddress.zipCode}
                            </Typography>

                        </CardContent>
                        <CardContent sx={{display:'flex',marginLeft:'auto'}}>
                            <Button onClick={() => {setUpdateAccountOpen(true);}}>
                                Edit
                            </Button>
                        </CardContent>
                    </CardContent>


                    
                    
                </Card>
         </Paper>
        )}

        {!userAddress && (
            <Paper elevation = {12} sx ={{borderRadius:5, width:'70%'}}  >
                <Card sx ={{borderRadius:5}}>
                    <CardHeader title="Delivery Address"></CardHeader>

                    <CardContent sx={{display:'flex',width:'80%'}}>
                        <Typography>
                            No Saved Address
                        </Typography>
                        <Button
                            sx={{ width: 300 }}
                            variant="contained"
                            onClick={() => {
                                setUpdateAccountOpen(true);
                              }}
                        >
                            Add Delivery Address
                        </Button>
                    </CardContent>
                    
                    
                </Card>
            </Paper>
        )}
       
       <Modal open={updateAccountOpen} onClose={() => setUpdateAccountOpen(false)}>
        <UpdateAccount handleAccountClose={handleAccountClose} userAddress={userAddress} />
      </Modal>
      </Box>



    )
}