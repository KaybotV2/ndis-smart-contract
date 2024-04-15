import React, { useState } from 'react';
import { contract } from '../resources/contract';


// Component
import ActionButton from '../components/ActionButton';

const WithdrawalRequest = ({ amount }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [serviceProviderAddress, setServiceProviderAddress] = useState('');

  const initiateWithdrawal = async (serviceProviderAddress) => {
    try {
      // Call the initiateWithdrawalRequest function on the contract
      await contract.methods.initiateWithdrawalRequest(selectedRequestId, amount).send({ from: serviceProviderAddress });
      // Update UI or handle success
      alert('Withdrawal request initiated successfully!');
    } catch (error) {
      setErrorMessage('Error initiating withdrawal request: ' + error.message);
    }
  };

  const handleConfirmAction = (_inputValue) => {
    if (selectedRequestId === null) {
      setErrorMessage('No request ID selected.');
      return;
    }
    
    initiateWithdrawal(serviceProviderAddress.trim());
  };
  

  const handleInputChange = (value) => {
    setServiceProviderAddress(value.trim()); // Update serviceProviderAddress with the trimmed value
  };

  const handleRequestIdSelection = (requestId) => {
    setSelectedRequestId(requestId); // Update selectedRequestId when a requestId is selected
  };

  return (
    <div>
      <ActionButton
        handleAction={() => setSelectedRequestId(null)}
        handleConfirmAction={handleConfirmAction}
        initiateButtonName="Approval Request"
        requestId={selectedRequestId}
        handleInputChange={handleInputChange} 
        onSelectRequestId={handleRequestIdSelection} // Pass handleRequestIdSelection to ActionButton
      />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default WithdrawalRequest;
