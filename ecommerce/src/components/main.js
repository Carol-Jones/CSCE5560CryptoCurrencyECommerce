import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import { getDatabase, set, ref, update } from "firebase/database";
import { database } from "../firebase";

import Item from "../Item";
function Main() {
  //Error Message
  const [errorMessage, setErrorMessage] = useState(null);

  //Sign in button
  const [ethButton, setEthButton] = useState(null);

  //Default Account
  const [defaultAccount, setDefaultAccount] = useState(null);

  //Set User Balance
  const [userBalance, setUserBalance] = useState(null);

  //Set shopping cart array
  const [shoppingCart, setShoppingCart] = useState(new Map());
  //If the shopping cart should be shown
  const [showCart, setShowCart] = useState(false);

  const [totalCost, setTotalCost] = useState(0);

  //Array of the items to sell
  const items = [];

  const names = [
    "Witchy Black Cat",
    "Feline Intrigue",
    "Clifftop Majesty",
    "Castle Dreams",
    "Double the Fun",
    "Sunshine Yarn Delight",
    "Boxed In and Loving It",
    "Cosmic Curiosity",
    "Wild West Whiskers",
    "Lunar Companions",
    "Kittyzilla",
    "Fireside Feline",
    "Sun-Kissed Snoozer",
    "Mysterious Illumination",
  ];

  //Create Items
  for (let i = 1; i <= 14; i++) {
    const itemName = names[i - 1];
    const itemImgPath = `images/productImages/IMG_${i}.WEBP`;
    const itemPrice = i + 2;
    const item = new Item(i, itemName, itemPrice, itemImgPath);
    items.push(item);
  }

  //Creates/updates the shopping cart popup
  function ShowShoppingCart() {
    var total = 0;
    const updateQuantity = (event, name) => {
      addToCart(items[name - 1], event.target.value - shoppingCart.get(name));
    };
    const removeItem = (name) => {
      setShoppingCart((curCart) => {
        const newCart = new Map(curCart);
        newCart.delete(name);
        return newCart;
      });
    };
    return (
      <div className="shoppingCartPopup">
        <h3>My Cart</h3>
        {Array.from(shoppingCart).map(([name, quantity]) => (
          <div key={name} className="shoppingCartPopupItem">
            <div className="shoppingCartPopupImage">
              <p>
                <strong>{items[name - 1].name}</strong>
              </p>
              <img src={items[name - 1].image}></img>
            </div>
            <div className="shoppingCartPopupInfo">
              <p>{items[name - 1].price} ETH</p>
              <label htmlFor="shoppingCartQuantity">Quantity: </label>
              <input
                type="number"
                id="shoppingCartQuantity"
                name="shoppingCartQuantity"
                min="1"
                max="5"
                defaultValue={quantity}
                onChange={(event) => updateQuantity(event, name)}
              ></input>
              <button type="button" onClick={() => removeItem(name)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <h3>Total: {totalCost} ETH</h3>
        <button onClick={checkOutHandler}>Check Out</button>
      </div>
    );
  }

  const showShoppingCartHandler = () => {
    setShowCart(!showCart);
  };

  //Check that Metamask is installed
  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      //If metamask isn't installed - tell the user to install metamask
      setErrorMessage("Please Install MetaMask!");
      //showAccount.innerHTML = "Please Install MetaMask!";
      console.log("Install MetaMask!");
    }
  };
  //Set Account
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount.toString());

    //add user etherium address to database users table
    try {
      update(ref(database, "users/"), {
        ethAddress: newAccount.toString(),
      })
        .then(() => {
          // Data saved successfully!
          alert("Etherium Address Saved Successfully");
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
    } catch {}
    accountBalanceHandler(newAccount);

    //add to database as user
    console.log(getDatabase);
  };

  //Get account Balance
  const accountBalanceHandler = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        //Set User Balance
        setUserBalance(ethers.formatEther(balance));
      });
  };

  const checkOutHandler = () => {
    // if (!defaultAccount) {
    //   alert("Please sign in first");
    //   return;
    // }
    console.log("Checking out");
    //Get grandtotal
    let grandTotal = 0;
    shoppingCart.forEach((quantity, item) => {
      grandTotal += items[item - 1].price * quantity;
    });
    console.log(grandTotal);
    //Total in hex
    console.log(grandTotal.toString(16));

    //Set transaction parameters
    const transactionParameters = {
      to: "0x9c89dB7875B0d7F8BF2f981a153925B62d4f024E", //Address that gets funds
      from: defaultAccount, //Address that pays
      value: Number(grandTotal * 1e18).toString(16), //Value (converted to wei)
    };
    //metamask function to send transaction.

    //metamask checks if the user has enough eth itself.
    window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
      .then((txHash) => {
        //Transaction is returned as a hash value
        console.log(txHash);
        console.log("Thank you for your purchase!");
        accountBalanceHandler(defaultAccount);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //Update the total whenever the cart is changed
  useEffect(() => {
    updateTotal();
  }, [shoppingCart]);

  //Calculate the new total
  const updateTotal = () => {
    let grandTotal = 0;
    shoppingCart.forEach((quantity, item) => {
      console.log(item);
      grandTotal += items[item - 1].price * quantity;
    });
    setTotalCost(grandTotal);
  };

  //Add a specified item and quantity to the cart
  const addToCart = (item, quantity) => {
    console.log(`Adding ${quantity} ${item.name} to Cart`);
    setShoppingCart(
      (curCart) =>
        new Map([
          ...curCart,
          [item.id, Number(curCart.get(item.id) || 0) + Number(quantity)],
        ])
    );
  };

  //Change to add html
  const viewCartHandler = () => {
    shoppingCart.forEach((quantity, item) => {
      console.log(`${item} : ${quantity}`);
      console.log(items[item - 1].price);
      console.log(items[item - 1].itemName);
    });
  };

  return (
    <div>
      <nav>
        <h1>Welcome to TempCity</h1>
        <h2>
          <em>Art for the modern age</em>
        </h2>
        <div className="navButtons">
          <button onClick={connectWalletHandler}>Enable Ethereum</button>
          <img
            className="shoppingCart"
            src="images/shopping-cart.svg"
            alt="Shopping Cart Button"
            onClick={showShoppingCartHandler}
          ></img>
        </div>
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
