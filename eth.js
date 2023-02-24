const ethButton = document.querySelector('.enableEthereumButton');

if(typeof window.ethereum !== 'undefined') {
  ethButton.addEventListener('click', () => {
    ethereum.request({ method: 'eth_requestAccounts' });
  });

}
else {
  console.log('Install MetaMask!');
}

