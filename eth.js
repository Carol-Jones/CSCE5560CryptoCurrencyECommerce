const ethButton = document.querySelector('connect-button');

if(typeof window.ethereum !== 'undefined') {
  ethButton.addEventListener('click', event => {
    ethereum.request({ method: 'eth_requestAccounts' });
  });
}
else {
  console.log('Install MetaMask!');
}

