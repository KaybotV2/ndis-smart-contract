import React, { useState, useEffect } from 'react';
import { contract } from '../resources/contract';
import web3 from '../resources/web3';
import DisplayServiceBooking from '../components/DisplayServiceBooking';
import DisplayServiceOffer from '../components/DisplayServiceOffer';
import DisplayWithdrawalRequest from '../components/DisplayWithdrawRequest';


const Dashboard = () => {
  const [error, setError] = useState('');
  const [contractBalance, setContractBalance] = useState('');
  const [ndiaAccount, setNdiaAccount] = useState('');
  const [bookings, setBookings] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
    } catch (error) {
      console.error('Error loading blockchain data:', error);
      setError('An error occurred while loading data from the blockchain.');
    }
  };


  return (
    <div className='container'>
      <div className='dashboard-header'>
        <h1>Welcome to the NDIS Smart Contract App</h1>
        <p>This contract is managed by: {ndiaAccount}</p>
        <p>Contract Balance: {contractBalance} Ether</p>
      </div>
        <div className="tabs">
        <button className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => handleTabChange('bookings')}>
          All Bookings
        </button>
        <button className={`tab-button ${activeTab === 'offers' ? 'active' : ''}`} onClick={() => handleTabChange('offers')}>
          All Service Offers
        </button>
        <button className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => handleTabChange('requests')}>
          All Requests
        </button>
      </div>
      {activeTab === 'bookings' && <DisplayServiceBooking bookings={bookings} />}
      {activeTab === 'offers' && <DisplayServiceOffer />}
      {activeTab === 'requests' && <DisplayWithdrawalRequest />}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Dashboard;
