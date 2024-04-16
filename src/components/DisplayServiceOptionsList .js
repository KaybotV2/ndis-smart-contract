import React, { useState } from 'react';
import {contract } from '../resources/contract'; 
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
      let accounts = web3.eth.getAccounts();
      const generatedJobNumber = generateJobNumber();
      // Convert amount to wei
      const amountWei = web3.utils.toWei(amount.toString(), 'ether');
      if (!accounts) {
          setError('Please select a MetaMask account.');
          return;
      }
      accounts = participantAddress
  
      await contract.methods.bookService(
          generatedJobNumber, 
          value, 
          amountWei, 
          participantAddress
      ).send({from: accounts});
      
      alert('Service booked successfully');
      handleRedirect()
      
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleInputChange = (participantAddress) => {
    setParticipantAddress(participantAddress);
  };

  const handleConfirmAction = (index) => { // Modify to accept index
    const { value, amount } = serviceOptions[index]; // Retrieve value and amount using index
    handleBooking(participantAddress, value, amount); // Pass value and amount

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
              handleConfirmAction={() => handleConfirmAction(index)} // Pass index to handleConfirmAction
            />
          </li>
        ))}
      </ul>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default DisplayServiceOptionsList;
