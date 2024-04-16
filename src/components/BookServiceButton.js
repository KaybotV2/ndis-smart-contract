import React, { useState } from 'react';

const BookServiceButton = ({ handleInputChange, handleConfirmAction }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleLocalInputChange = (e) => {
    setInputValue(e.target.value);
    handleInputChange(e.target.value); // Invoke parent's handleInputChange
  };

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleCancel = () => {
    setShowInput(false);
    setError('');
  };

  const handleConfirm = () => {
    handleConfirmAction(inputValue);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Book</button>
      {showInput && (
        <>
          <input
            type="text"
            placeholder="Enter participant address"
            value={inputValue}
            onChange={handleLocalInputChange}
          />
          <div>
            <button onClick={handleConfirm} disabled={loading}>
              {loading ? 'Loading...' : 'Confirm'}
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default BookServiceButton;
