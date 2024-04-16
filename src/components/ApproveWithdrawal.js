import React, { useState } from 'react';
import { contract } from '../resources/contract';
import RequestIdLookup from './RequestIdLookup';

const ApproveWithdrawal = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState('');

    const handleButtonClick = () => {
        setShowInput(true);
      };

    
      const handleCancel = () => {
        setShowInput(false);
        setError('');
      };
    
      const handleRequestIdSelection = (requestId) => {
        setSelectedRequestId(requestId);
      };

    const handleApproveWithdrawal = async () => {
        setLoading(true);
        try {
            const ndia = await contract.methods.ndia().call();
            await contract.methods.approveWithdrawal(selectedRequestId).send({ from: ndia });
            // Update UI or handle success
            alert('Request has been approved successfully!');

        } catch (error) {
            setError('Error approving withdrawal: ' + error.message);
            console.error('Error approving withdrawal:', error);
        }
        setLoading(false);
    };

    return (
        <div>
           <button onClick={handleButtonClick}>Approve</button>
           {showInput && (
              <div className="popup">
                <div className="popup-content">
                <button className="close-btn" onClick={handleCancel}>X</button>
                <RequestIdLookup onSelectRequestId={handleRequestIdSelection} />
                {selectedRequestId && (
                  <>
                    <button onClick={handleApproveWithdrawal} disabled={loading}>
                    {loading ? 'Loading...' : 'Confirm'}
                    </button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                )}
                </div>
              </div>
           )}
             {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      );
};

export default ApproveWithdrawal;
