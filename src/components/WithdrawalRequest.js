import React, { useState } from 'react';
import { contract } from '../resources/contract';

// Component
import RequestIdLookup from './RequestIdLookup';

const WithdrawalRequest = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState('');

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCancel = () => {
    setShowInput(false);
    setInputValue('');
    setError('');
  };

  const handleRequestIdSelection = (requestId) => {
    setSelectedRequestId(requestId);
  };

  const initiateWithdrawal = async () => {
    setLoading(true);
    try {
      let providerAddress = inputValue.trim();
      // Call the initiateWithdrawalRequest function on the contract
      await contract.methods.initiateWithdrawalRequest(selectedRequestId, amount).send({ from: providerAddress });
      // Update UI or handle success
      alert('Withdrawal request initiated successfully!');
    } catch (error) {
      setError('Error initiating withdrawal request: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div>
       <button onClick={handleButtonClick}>Initiate Withdrawal</button>
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
                <button onClick={initiateWithdrawal} disabled={loading}>
                {loading ? 'Loading...' : 'Confirm'}
                </button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            )}
          </div>
       )}
         {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default WithdrawalRequest;
