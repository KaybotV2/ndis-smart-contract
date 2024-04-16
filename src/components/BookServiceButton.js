import React, { useState } from 'react';

const BookServiceButton = ({ handleInputChange, handleConfirmAction }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleLocalInputChange = (e) => {
    setInputValue(e.target.value);
    handleInputChange(e.target.value);
  };

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleCancel = () => {
    setShowInput(false);
    setError('');
    setInputValue('');
  };

  const handleConfirm = () => {
    setLoading(true);
    handleConfirmAction(inputValue)
      .then(() => {
        setLoading(false);
        setShowInput(false);
        setInputValue('');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Book</button>
      {showInput && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={handleCancel}>Close</button>
            <input
              id="participantAddressInput"
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
          </div>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default BookServiceButton;
