import { React, useState, useEffect, useContext, useRef } from "react";
import { EthContext } from "../context/EthContext";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';


export default function WalletInfo(){
    const {defaultAccount, connectWalletHandler} = useContext(EthContext);

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
       
        <Paper elevation = {12} sx ={{borderRadius:5, width:'70%'}}>
            <Card sx ={{ borderRadius:5}}>
                <CardHeader title="Metamask"></CardHeader>

                <CardContent sx={{display:'flex',width:'80%'}}>
                    <CardContent sx={{marginLeft:4, }}>
                    
                        {defaultAccount && (
                        <Typography sx={{textAlign:"left"}}>
                           Account Connected 
                        </Typography>
                        )}
                        
                        {!defaultAccount && (
                        <Typography sx={{textAlign:"left"}}>
                            Account Disconnected 
                        </Typography>
                        )}
                        
               

                    </CardContent>
                    <CardContent sx={{display:'flex',marginLeft:'auto'}}>
                        {defaultAccount && (
                            <CheckCircleOutlineIcon />
                        )}

                        {!defaultAccount && (
                            <ErrorOutlineIcon />
                        )}
                    </CardContent>

                   
                </CardContent>
                {!defaultAccount && (
                        <CardContent>
                        <Button
                        sx={{ width: 400 }}
                        variant="contained"
                        onClick ={()=>connectWalletHandler()}
                        >
                        Connect to MetaMask
                        </Button>
                        </CardContent>
                    )}
            </Card>
         </Paper>
        

    </Box>
    )
}