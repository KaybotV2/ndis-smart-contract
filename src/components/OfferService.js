import React, { useState } from 'react';
import { contract } from '../resources/contract';
import ActionButton from '../components/ActionButton';

const OfferService = ({ participant, serviceDescription, redirectToServiceOffer  }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [serviceProviderAddress, setServiceProviderAddress] = useState('');
  
 
  const handleOfferService = async (serviceProviderAddress) => {
    try {
      if (selectedRequestId === null) {
        throw new Error("No request ID selected.");
      }
      
      await contract.methods
        .offerService(participant, selectedRequestId, serviceDescription)
        .send({ from: serviceProviderAddress });
      alert("Service offered successfully");
      redirectToServiceOffer(); 
    } catch (error) {
      setErrorMessage('An error occurred while offering the service.');
      console.error(error);
    }
  };
  

  const handleConfirmAction = (_inputValue) => {
    if (selectedRequestId === null) {
      setErrorMessage('No request ID selected.');
      return;
    }
    
    handleOfferService(serviceProviderAddress.trim());
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
        initiateButtonName="Offer Service"
        requestId={selectedRequestId}
        handleInputChange={handleInputChange} 
        onSelectRequestId={handleRequestIdSelection} // Pass handleRequestIdSelection to ActionButton
      />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default OfferService;
