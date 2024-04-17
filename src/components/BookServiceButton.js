import React, { useState } from 'react';

const BookServiceButton = ({ items, handleConfirmAction }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [participantAddress, setParticipantAddress] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleButtonClick = (item) => {
    setSelectedItem(item);
    setShowInput(true);
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setShowInput(false);
    setError('');
    setParticipantAddress('');
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (!selectedItem) return;
      await handleConfirmAction(participantAddress, selectedItem.value, selectedItem.amount);
      setShowInput(false);
      setParticipantAddress('');
      setLoading(false);
    } catch (error) {
      setError(error.message || 'An error occurred during confirmation.');
      setLoading(false);
    }
  };

  return (
    <div>
      <ul className='container-display-flex'>
      {items.map(item => (
        <li key={item.value} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {item.value}: {item.amount} ETH
          </div>
          <button onClick={() => handleButtonClick(item)}>Book</button>
          {showInput && selectedItem === item && (
            <div className="popup">
              <div className="popup-content">
                <button className="close-btn" onClick={handleCancel}>Close</button>
                <input
                  id="participantAddressInput"
                  type="text"
                  placeholder="Enter participant address"
                  value={participantAddress}
                  onChange={(e) => setParticipantAddress(e.target.value)}
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
        </li>
      ))}
      </ul>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default BookServiceButton;
