import React, { useState } from 'react';
import { web3, getContractInstance } from '../resources/web3Utils'; 

const Deposit = () => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDeposit = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        try {
            setLoading(true);
            const contract = getContractInstance();
            const accounts = await web3.eth.getAccounts();
            const senderAddress = accounts[0]; 

            await contract.methods.deposit().send({ 
                value: web3.utils.toWei(amount, 'ether'), 
                from: senderAddress
            });
            setAmount('');
            setError('');
            alert('Deposit successful');
        } catch (error) {
            console.error('Error depositing:', error);
            setError('Failed to deposit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Deposit Funds</h2>
            <form onSubmit={handleDeposit}>
                <div>
                    <label htmlFor="amount">Amount (ETH):</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Depositing...' : 'Deposit'}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Deposit;
