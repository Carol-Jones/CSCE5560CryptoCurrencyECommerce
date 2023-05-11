import { React, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { getDatabase, set, ref, update } from "firebase/database";
import { database } from "../firebase";
import { EthContext } from "../context/EthContext";
import { CartContext } from "../context/CartContext";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Item from "../Item";
import Login from "./login";
import Modal from "./modal";

import { Icon } from "@mui/material";

import items from "../items";

function Main() {
  const navigate = useNavigate();
  //Error Message
  const [errorMessage, setErrorMessage] = useState(null);

  //Sign in button
  const [ethButton, setEthButton] = useState(null);

  //get function and variables from context
  const {
    connectWalletHandler,
    accountChangedHandler,
    accountBalanceHandler,
    defaultAccount,
    userBalance,
  } = useContext(EthContext);
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

  return (
    <div>
      {/* <Box sx={{ width: 300, height: 300, backgroundColor: "violet" }}></Box> */}
      <nav>
        <h1>Welcome to TempCity</h1>
        <h2>
          <em>Art for the modern age</em>
        </h2>

        <div id="portal"></div>
        {showCart && <ShowShoppingCart cartItems={shoppingCart} />}
      </nav>

      <p id="eth-account"></p>
      <div className="accountDisplay">
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance: {userBalance}</h3>
      </div>
      <div className="navi">
        <div className="container">
          <nav></nav>
        </div>
      </div>
      <main>
        <div className="containermain">
          {items.map((item, number) => (
            <Card
              raised={true}
              style={{
                textAlign: "center",
                padding: 25,
                margin: 25,
                width: 225,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt=""
              />
              <Typography variant="h5" gutterBottom>
                {item.name}
              </Typography>
              <Typography
                variant="p"
                color="red"
                fontWeight="bold"
                gutterBottom
              >
                {item.price} ETH
              </Typography>
              <form
                className="addtoCart"
                onSubmit={(event) => {
                  event.preventDefault();
                  addToCart(item, event.target.elements[0].value);
                }}
              >
                <CardActions>
                  <TextField
                    if="quantity"
                    type="number"
                    label="Quantity"
                    inputProps={{
                      min: 1,
                      max: 5,
                      defaultValue: 1,
                    }}
                  />
                </CardActions>
                <CardActions>
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    type="submit"
                  >
                    Add To Cart
                  </Button>
                </CardActions>
              </form>
            </Card>
          ))}
        </div>
      </main>
      <footer>
        <small>&copy; 2023 CSCE 5650 Group 5</small>
      </footer>
    </div>
  );
}

export default Main;
