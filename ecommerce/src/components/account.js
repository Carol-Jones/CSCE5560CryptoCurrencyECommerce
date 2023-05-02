import { React, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { getDatabase, set, ref, update } from "firebase/database";
import { database } from "../firebase";
import { EthContext } from "../context/EthContext";
import { CartContext } from "../context/CartContext";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

import AccountInfo from "./accountInfo";
import WalletInfo from "./walletInfo"
const drawerWidth = 150;

export default function Account(){

    const {
        shoppingCart,
        showCart,
        totalCost,
        addToCart,
        updateTotal,
        showShoppingCartHandler,
        ShowShoppingCart,
        checkOutHandler,
      } = useContext(CartContext);

    const [info, setInfo] = useState(false);
    const [wallet, setWallet] = useState(false);
    const [orders, setOrders] = useState(false);



    return(
       
        <div>

    {showCart && <ShowShoppingCart cartItems={shoppingCart} />}

        <Box sx={{display:'flex'}}> 

            <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                marginTop: 8,
                background: 'inherit',
                },
            }}
            variant="permanent"
            anchor="left"
            >
            
                <List sx={{marginTop:5}}>

                    <ListItem >
                        <ListItemButton onClick={()=> {
                            setInfo(true); 
                            setWallet(false);
                            setOrders(false);
                        }}>
                            <h3>Info</h3>
                        </ListItemButton> 
                    </ListItem>

                    <ListItem >
                        <ListItemButton onClick={()=> {
                            setWallet(true);
                            setInfo(false);
                            setOrders(false);

                        }}>
                            <h3>Wallet</h3>
                        </ListItemButton> 
                    </ListItem>


                </List>

            </Drawer>


            </Box>
                <Box 
                component="main"
                sx={{ marginLeft: '150px',background: 'inherit', p: 3, }}
                >
                    {info && (
                        <Box 
                        sx={{display:'flex', flexDirection: "column",
                        alignItems: "center", }}>
                            <h3></h3>
                        <AccountInfo />
                
                        </Box>
                    )}

                    {wallet && (
                        <div>
                            <h3></h3>
                        <WalletInfo />
                        </div>
                    )}
                <Box>
            </Box>

        </Box>


        </div>
    )
}

