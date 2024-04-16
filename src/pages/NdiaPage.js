import React, { useState } from 'react';

import Deposit from '../components/Deposit';
import RegisterAccount from '../components/RegisterAccount';
import LookupApprovalResquest from '../components/SearchApprovalRequest';

const NdaiPage = () => {
  const [activeTab, setActiveTab] = useState('deposit');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='container'>
      <div className="tabs">
        <button className={`tab-button ${activeTab === 'deposit' ? 'active' : ''}`} onClick={() => handleTabChange('deposit')}>
          Deposit Fund
        </button>
        <button className={`tab-button ${activeTab === 'register' ? 'active' : ''}`} onClick={() => handleTabChange('register')}>
          Register Account
        </button>
        <button className={`tab-button ${activeTab === 'approval' ? 'active' : ''}`} onClick={() => handleTabChange('approval')}>
          Approval Request
        </button>
      </div>
      {activeTab === 'deposit' && <Deposit />}
      {activeTab === 'register' && <RegisterAccount />}
      {activeTab === 'approval' && <LookupApprovalResquest />}
    </div>
  );
};

export default NdaiPage;
