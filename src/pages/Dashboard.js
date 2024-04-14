import React, {useState, useEffect} from 'react';
import { contract } from '../resources/contract';
import web3 from '../resources/web3';

// Components 
import DisplayServiceBooking from '../components/DisplayServiceBooking';

const Dashboard = () => {
  const [booking, setBooking] = useState('')
  const [contractBalance, setContractBalance] = useState('');
  const [ndia, setNdiaAccount] = useState('');

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    try {
  
      const ndia = await contract.methods.ndia().call();
      setNdiaAccount(ndia);
  
      const balance = await contract.methods.participantFunds().call();
      setContractBalance(web3.utils.fromWei(balance, 'ether'));

      const bookings = await contract.methods.getBookingRequests().call()
      setBooking(bookings);
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  };

  return (
    <div className='container'>
        <h1>Welcome to the NDIS Smart Contract App</h1>
        <div>This contract is managed by: {ndia}</div>
        <div>Contract Balance: {contractBalance} Ether</div>
        <DisplayServiceBooking bookings={booking} />
    </div>
  );
};

export default Dashboard;
