import React, { useState } from 'react';
import { contract } from '../resources/contract';

import RequestIdLookup from '../components/RequestIdLookup';

const OfferService = ({ participant, serviceDescription }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedRequestId, setSelectedRequestId] = useState('');
  
    const handleButtonClick = () => {
      setShowInput(true);
    };
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleOfferService = async () => {
      try {
        if (!selectedRequestId || !inputValue) {
          setErrorMessage('Please enter a request ID and a service provider address.');
          return;
        }
        const serviceProviderAddress = inputValue.trim();
        // Call the offerService function with the provided data
        await contract.methods.offerService(participant, selectedRequestId, serviceDescription)
          .send({ from: serviceProviderAddress });
        setSelectedRequestId('');
        setInputValue('');
        setErrorMessage('');
        setShowInput(false);
      } catch (error) {
        setErrorMessage('An error occurred while offering the service.');
        console.error(error);
      }
    };
  
    const handleCancel = () => {
      setShowInput(false);
      setInputValue('');
      setErrorMessage('');
    };
  
    const handleRequestIdSelection = (requestId) => {
      setSelectedRequestId(requestId);
    };
  
    return (
        <div>
          <button onClick={handleButtonClick}>Offer Service</button>
          {showInput && (
            <div>
              <RequestIdLookup onSelectRequestId={handleRequestIdSelection} />
              
              {selectedRequestId && (
                <>
                    <input
                        type="text"
                        placeholder="Enter service provider address"
                        value={inputValue}
                        onChange={handleInputChange} />
                    <button onClick={handleOfferService}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
              )}
            </div>
          )}
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
      );
  };
  
  export default OfferService;
