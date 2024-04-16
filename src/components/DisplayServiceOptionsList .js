// DisplayServiceOptionsList.js

import React, { useState } from 'react';
import { contract } from '../resources/contract';
import web3 from '../resources/web3';
import Dashboard from '../pages/Dashboard';
import BookServiceButton from './BookServiceButton';

const DisplayServiceOptionsList = () => {
  const [participantAddress, setParticipantAddress] = useState('');
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

  const handleBooking = async (participantAddress, value, amount) => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        setError('Please select a MetaMask account.');
        return;
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
      setError(error.message || 'An error occurred during booking.');
    }
  };

  const handleInputChange = (participantAddress) => {
    setParticipantAddress(participantAddress);
  };

  const handleConfirmAction = async (index) => {
    const { value, amount } = serviceOptions[index];
    await handleBooking(participantAddress, value, amount);
  };

  if (redirect) {
    return <Dashboard />;
  }

  return (
    <div>
      <h2>Service Options</h2>
      <ul className='container-display-flex'>
        {serviceOptions.map((option, index) => (
          <li key={index}>
            <div>
              {option.value}: {option.amount} ETH
            </div>
            <BookServiceButton
              handleInputChange={handleInputChange}
              handleConfirmAction={() => handleConfirmAction(index)}
            />
          </li>
        ))}
      </ul>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default DisplayServiceOptionsList;
