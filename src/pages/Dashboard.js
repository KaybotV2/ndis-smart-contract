import React, { useState, useEffect } from 'react';
import { contract } from '../resources/contract';
import web3 from '../resources/web3';
import DisplayServiceBooking from '../components/DisplayServiceBooking';

const Dashboard = () => {
  const [contractBalance, setContractBalance] = useState('');
  const [ndiaAccount, setNdiaAccount] = useState('');
  const [bookings, setBookings] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    try {
      const ndia = await contract.methods.ndia().call();
      setNdiaAccount(ndia);

      const balance = await contract.methods.participantFunds().call();
      setContractBalance(web3.utils.fromWei(balance, 'ether'));

      const bookings = await contract.methods.getBookingRequests().call();
      setBookings(bookings);
      setLoading(false);
    } catch (error) {
      console.error('Error loading blockchain data:', error);
      setError('An error occurred while loading data from the blockchain.');
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='dashboard-header'>
        <h1>Welcome to the NDIS Smart Contract App</h1>
        <p>This contract is managed by: {ndiaAccount}</p>
        <p>Contract Balance: {contractBalance} Ether</p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <DisplayServiceBooking bookings={bookings} />
      )}
    </div>
  );
};

export default Dashboard;
