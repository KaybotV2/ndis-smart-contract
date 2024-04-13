import React, { useState, useEffect } from 'react';
import './App.css';

// Utils
import { web3, getContractInstance } from './resources/web3Utils';

// Components
import Deposit from './components/Deposit';
import RegisterAccount from './components/RegisterAccount';

function App() {
  const [account, setAccount] = useState('');
  const [contractInstance, setContractInstance] = useState(null);
  const [contractBalance, setContractBalance] = useState('');
  const [ndia, setNdiaAccount] = useState('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const contract = getContractInstance();
        setContractInstance(contract);

        const ndia = await contract.methods.ndia().call();
        setNdiaAccount(ndia);

        const balance = await contract.methods.participantFunds().call();
        setContractBalance(web3.utils.fromWei(balance, 'ether'));
      } catch (error) {
        console.error('Error loading blockchain data:', error);
      }
    };

    loadBlockchainData();
  }, []);


  return (
    <>
      <h1>Welcome to the NDIS Smart Contract App</h1>
      <div>This contract is managed by: {ndia}</div>
      <div>Contract Balance: {contractBalance} Ether</div>
      <hr></hr>
      <Deposit/>
      <hr></hr>
      <RegisterAccount/>
    </>
  );
}

export default App;
