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

const drawerWidth = 150;

export default function Account(){
    const [info, setInfo] = useState(false);
    const [wallet, setWallet] = useState(false);
    const [orders, setOrders] = useState(false);


    return(
       
        <div>

      
        <Box sx={{ display: 'flex'}}>
        <AppBar
          position='relative'
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
    
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

          <ListItem >
            <ListItemButton onClick={()=> {
                setOrders(true);
                setInfo(false);
                setWallet(false);
                
            }}>
                <h3>Orders</h3>
            </ListItemButton> 
          </ListItem>

          </List>

        </Drawer>


        </Box>
            <Box 
            component="main"
            sx={{display:'flex', marginLeft: '150px',bgcolor: 'background.default', p: 3 }}
            >
            
            {info && (
                <div>
                    <h3>Info</h3>
         
                </div>
            )}

            {wallet && (
                <div>
                    <h3>Wallet</h3>

                </div>
            )}

            {orders && (
                <div>
                    <h3>Orders</h3>

                </div>
            )}

            <Box>

        </Box>
           
        </Box>


        </div>

        
    )
}

/*
export default function PermanentDrawerLeft() {
    return (
      <Box sx={{ display: 'flex' }}>
        
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
            eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
            neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
            tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
            sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
            tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
            et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
            tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
            eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
            posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
        </Box>
      </Box>
    );
  }
  */