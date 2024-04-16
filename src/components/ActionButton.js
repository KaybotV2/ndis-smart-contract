import React, { useState } from 'react';
import RequestIdLookup from '../components/RequestIdLookup';

function ActionButton({ handleAction, handleConfirmAction, initiateButtonName, requestId, handleInputChange, onSelectRequestId }) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLocalInputChange = (e) => {
    setInputValue(e.target.value);
    handleInputChange(e.target.value); // Invoke parent's handleInputChange
  };

  const handleCancel = () => {
    setShowInput(false);
    setInputValue('');
    setError('');
  };

  const handleInitiateAction = () => {
    setShowInput(true);
    handleAction(); // Call the handleAction function provided by the parent
  };

  const handleConfirm = () => {
    handleConfirmAction(inputValue); // Pass inputValue or any necessary data to the confirm action handler
    setLoading(false); // Set loading state if needed
  };

  return (
    <div>
      <button onClick={handleInitiateAction}>{initiateButtonName}</button> {/* Use the prop for button name */}
      {showInput && (
        <div>
          <RequestIdLookup onSelectRequestId={onSelectRequestId} /> {/* Pass onSelectRequestId prop to RequestIdLookup */}
          {requestId && ( 
            <>
                <input
                    type="text"
                    placeholder="Enter service provider address"
                    value={inputValue}
                    onChange={handleLocalInputChange} 
                />
                <button onClick={handleConfirm} disabled={loading}>
                {loading ? 'Loading...' : 'Confirm'}
                </button><button onClick={handleCancel}>Cancel</button>
            </>
          )}
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default ActionButton;
