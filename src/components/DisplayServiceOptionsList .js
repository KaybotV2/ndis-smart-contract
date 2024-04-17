import React, { useState } from 'react';
import { contract } from '../contract/contract';
import web3 from '../contract/web3';
import Dashboard from '../pages/Dashboard';
import BookServiceButton from './BookServiceButton';

const DisplayServiceOptionsList = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const serviceOptions = [
    { value: 'Consumables', amount: 0.00005 },
    { value: 'Daily Activities', amount: 0.00002 },
    { value: 'Assistance with Social and Community Participation', amount: 0.00005 },
    { value: 'Transport', amount: 0.00002 },
    { value: 'Specialised Disability Accommodation', amount: 2 },
    { value: 'Home Living', amount: 0.00005 },
    { value: 'Lifelong Learning', amount: 0.00005 },
    { value: 'Relationships', amount: 0.00005 },
    { value: 'Employment', amount: 0.00005 },
    { value: 'Support Coordination', amount: 1 }
  ];

  const handleRedirect = () => {
    setRedirect(true);
  };

  const generateJobNumber = () => {
    return Date.now().toString();
  };

  const handleConfirmAction = async (participantAddress, value, amount) => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        throw new Error('Please select a MetaMask account.');
      }
      const generatedJobNumber = generateJobNumber();
      const amountWei = web3.utils.toWei(amount.toString(), 'ether');
      await contract.methods.bookService(
        generatedJobNumber,
        value,
        amountWei,
        participantAddress
      ).send({ from: accounts[0] });
      alert('Service booked successfully');
      handleRedirect();
    } catch (error) {
      console.log(error);
      setError(error.message || 'An error occurred during confirmation.');
    }
  };

  if (redirect) {
    return <Dashboard />;
  }

  return (
    <div>
      <h2>Service Options</h2>
      <BookServiceButton
        items={serviceOptions}
        handleConfirmAction={handleConfirmAction}
      />
      {error && <div style={{ color: 'red' }}>{error.toString()}</div>}
    </div>
  );
};

export default DisplayServiceOptionsList;
