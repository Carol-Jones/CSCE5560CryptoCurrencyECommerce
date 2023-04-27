import { React, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { getDatabase, set, ref, update } from "firebase/database";
import { database } from "../firebase";
import { EthContext } from "../context/EthContext";
import { CartContext } from "../context/CartContext";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

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
            <div className="containerproduct" key={number}>
              <img className="product" src={item.image} alt=""></img>
              <p>
                <span className="productID">{item.name}</span>
              </p>
              <p>
                <span className="productPrice">{item.price} ETH</span>
              </p>
              <form
                className="addtoCart"
                onSubmit={(event) => {
                  event.preventDefault();
                  addToCart(item, event.target.quantity.value);
                }}
              >
                <div>
                  <label htmlFor="quantity">Quantity: </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max="5"
                    defaultValue={1}
                  ></input>
                </div>
                <input
                  type="submit"
                  id="add"
                  name="add"
                  value="Add To Cart"
                ></input>
              </form>
            </div>
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
