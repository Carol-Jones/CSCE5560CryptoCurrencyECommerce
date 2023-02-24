
//Sign in button
const ethButton = document.getElementById('connect-button');

//Show the signed in account
const showAccount = document.getElementById('eth-account');

//Check that Metamask is installed
if(typeof window.ethereum !== 'undefined') {
  ethButton.addEventListener('click', () => {
    getAccount();
  });
}
else {
  //If metamask isn't installed - tell the user to install metamask
  showAccount.innerHTML = "Please Install MetaMask!";
  console.log('Install MetaMask!');
}

async function getAccount() {
  //Get account (as an array)
  const accounts = await ethereum.request ({method: 'eth_requestAccounts'});

  //Get the first element of accounts
  const account = accounts[0];

  //Change HTML element
  showAccount.innerHTML =  "Account: "+account;
}