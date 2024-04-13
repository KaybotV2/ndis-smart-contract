import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; 
import './App.css';
import NdisContract from './NdisContract';

function App() {
  const [account, setAccount] = useState('');
  const [contractInstance, setContractInstance] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const web3 = await loadWeb3();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = NdisContract.networks[networkId];
        const instance = new web3.eth.Contract(
          NdisContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContractInstance(instance);
      } catch (error) {
        console.error('Error loading blockchain data:', error);
      }
    };

    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        return window.web3;
      } catch (error) {
        throw new Error('User denied account access');
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      return window.web3;
    } else {
      console.warn('Non-Ethereum browser detected. Consider installing MetaMask.');
      throw new Error('No web3 instance found.');
    }
  };

  return (
    <>
      <h1>Welcome to the NDIS Smart Contract App</h1>
      <div>account: {account}</div>
    </>
  );
}

export default App;
