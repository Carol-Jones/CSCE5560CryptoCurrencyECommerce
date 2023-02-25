import {React,useState} from 'react';
import { ethers } from "ethers";

function Main()
{

//Error Message
const [errorMessage, setErrorMessage] = useState(null);

//Sign in button
const [ethButton, setEthButton] = useState(null);

//Default Account
const [defaultAccount, setDefaultAccount] = useState(null);

//Set User Balance
const [userBalance, setUserBalance] = useState(null);


//Check that Metamask is installed
const connectWalletHandler = () =>
{
    if(window.ethereum) {
        window.ethereum.request ({method: 'eth_requestAccounts'})
        .then(result => {
            accountChangedHandler(result[0]);
        })
      }
      else {
        //If metamask isn't installed - tell the user to install metamask
        setErrorMessage("Please Install MetaMask!");
        //showAccount.innerHTML = "Please Install MetaMask!";
        console.log('Install MetaMask!');
      }
}
//Set Account 
const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount.toString());
    accountBalanceHandler(newAccount)
}

//Get account Balance
const accountBalanceHandler = (address) => {
  window.ethereum.request ({method: 'eth_getBalance', params: [address, 'latest']})
    .then(balance => {
        //Set User Balance
        setUserBalance(ethers.formatEther(balance));
    }) 
  
}



    return(
        <div>
            <h1>This is main.js</h1>
             <h1>Welcome to TempCity</h1>
  <button onClick={connectWalletHandler}>Enable Ethereum</button>
  <p id = "eth-account"></p>
  <div classname ='accountDisplay'>
        <h3>Address: {defaultAccount}</h3>
  </div>
  <div className='balanceDisplay'>
        <h3>Balance: {userBalance}</h3>
  </div>
  <div className="navi">
    <div className="container">
      <nav>

      </nav>
    </div>
  </div>
  <main>
    
    <div className="containermain">
      <div className="containerproduct">
        <img className="product" src="images/IMG_0098.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0099.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0100.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0101.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0102.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0103.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0104.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0105.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0106.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0107.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0108.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0109.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0110.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      <div className="containerproduct">
        <img className="product" src="images/IMG_0111.WEBP" alt=""></img>
        <p><span className="productID">Test</span></p>
        <p><span className="productPrice">15 Eth</span></p>
      </div>
      
    </div>
  </main>
  <footer><small>&copy; 2023 CSCE 5650 Group 5</small></footer>
        </div>
    )
}

export default Main

 

  
