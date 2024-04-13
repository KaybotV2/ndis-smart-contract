import React, {useState, useEffect} from 'react';
import {web3, getContractInstance } from '../resources/web3Utils';

const Dashboard = () => {
  const [contractInstanc, setContractInstance] = useState(null)
  const [contractBalance, setContractBalance] = useState('');
  const [ndia, setNdiaAccount] = useState('');

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    try {
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

  return (
    <div>
        <h1>Welcome to the NDIS Smart Contract App</h1>
        <div>This contract is managed by: {ndia}</div>
        <div>Contract Balance: {contractBalance} Ether</div>
    </div>
  );
};

export default Dashboard;
