import { React, useState, useContext } from "react";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "../components/login";
import Register from "../components/register";
import Modal from "../components/modal";

import { useAuth } from "../context/AuthContext";
import { EthContext } from "../context/EthContext";
import { CartContext } from "../context/CartContext";

function NavBar() {
  const { currentUser, logout } = useAuth();
  const {
    connectWalletHandler,
    accountChangedHandler,
    accountBalanceHandler,
    defaultAccount,
    userBalance,
  } = useContext(EthContext);

  const { showShoppingCartHandler } = useContext(CartContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const navigateToAccount = () => {
    setAnchorEl(null);
  };

  const navigateToCart = () => {
    setAnchorEl(null);
  };

  const enableEth = () => {
    connectWalletHandler();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#211D1D" }}>
      <Toolbar>
        <div className="navSpacer"></div>
        {currentUser && (
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={showShoppingCartHandler}
              color="inherit"
            >
              <ShoppingCartIcon />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              style={{ width: "300px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  navigateToAccount();
                  handleClose();
                }}
              >
                Account
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleLogOut();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}

        {!currentUser && (
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setLoginOpen(true);
                  handleClose();
                }}
              >
                Log in
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setRegisterOpen(true);
                  handleClose();
                }}
              >
                Register
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>

      <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
        <Login />
      </Modal>
      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
        <Register />
      </Modal>
    </AppBar>
  );
}

export default NavBar;
