import React, { useState } from 'react';
import { web3, getContractInstance } from '../resources/web3Utils';

function RegisterAccount() {
  const [account, setAccount] = useState('');
  const [isParticipantAccount, setIsParticipantAccount] = useState(true); // Default to participant account
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      const contract = getContractInstance();
      await contract.methods.registerAccount(account, isParticipantAccount).send({ from: accounts[0] });
      setAccount('');
      setError('');
      alert('Account registered successfully');
    } catch (error) {
      console.error('Error registering account:', error);
      setError('Failed to register account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register Participant</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="account">Account:</label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="participant">Participant Account:</label>
          <input
            type="checkbox"
            id="participant"
            checked={isParticipantAccount}
            onChange={(e) => setIsParticipantAccount(e.target.checked)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default RegisterAccount;