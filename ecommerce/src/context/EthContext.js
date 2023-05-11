import React, { useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { getDatabase, set, ref, update } from "firebase/database";
import { database } from "../firebase";


export const EthContext = React.createContext();

export const EthProvider = ({ children }) => {
    //Error Message
  const [errorMessage, setErrorMessage] = useState(null);

  //Sign in button
  const [ethButton, setEthButton] = useState(null);

  //Default Account
  const [defaultAccount, setDefaultAccount] = useState(null);

  //Set User Balance
  const [userBalance, setUserBalance] = useState(null);

  //Set shopping cart array
  const [shoppingCart, setShoppingCart] = useState([]);


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

 

  return (
    <EthContext.Provider
    value ={{
        defaultAccount,
        userBalance,
        connectWalletHandler,
        
    }}
    >
        {children}
    </EthContext.Provider>
  )
}

