import React, { useState } from 'react';

const ApproveWithdrawal = ({ contractInstance }) => {
    const [requestId, setRequestId] = useState('');
    const [error, setError] = useState('');

    const handleApproveWithdrawal = async () => {
        try {
            const ndia = await contractInstance.methods.ndia().call();
            await contractInstance.methods.approveWithdrawal(requestId).send({ from: ndia });

            setRequestId('');
            setError('');

        } catch (error) {
            setError('Error approving withdrawal: ' + error.message);
            console.error('Error approving withdrawal:', error);
        }
    };

    return (
        <div>
            <h2>Approve Withdrawal</h2>
            <input
                type="text"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                placeholder="Enter requestId"
            />
            <button onClick={handleApproveWithdrawal}>Approve Withdrawal</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ApproveWithdrawal;
