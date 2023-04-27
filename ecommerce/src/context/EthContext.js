import React, { useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { getDatabase, set, ref, update, onValue, orderByChild, } from "firebase/database";
import { database } from "../firebase";

import { useAuth } from "./AuthContext";

export const EthContext = React.createContext();

export const EthProvider = ({ children }) => {

  const { getCurrentUser } = useAuth();
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
    const user = getCurrentUser();

    //check if eth address already exists 
    const ethRef = ref(database, `users/${user.uid}`);
    onValue(ethRef, (snapshot) => {
      const data = snapshot.val();
      const ethAddressRef = data.ethAddress.toString();
      if(ethAddressRef !=newAccount)
      {
        try {
          update(ref(database, "users/" + user.uid), {
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
      }
    });
    //add user etherium address to database users table


    
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

  //reload window to disconnect MetaMask if user is logged out 
  const disconnectWallet = async () =>
  {
    try {
      const user = await getCurrentUser();
      if(!user && defaultAccount){
        window.location.reload();
      }
    }catch{

    }

  }

  //reconnect MetaMask if page refreshes and user is still logged in
  useEffect(() => {
    const user = getCurrentUser();
    if(user && !defaultAccount){
      connectWalletHandler();
    }
  })
  

  return (
    <EthContext.Provider
    value ={{
        defaultAccount,
        userBalance,
        connectWalletHandler,
        disconnectWallet,
        
    }}
    >
        {children}
    </EthContext.Provider>
  )
}

