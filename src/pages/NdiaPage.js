import React from 'react';
import { contract } from '../resources/contract'; 

import Deposit from '../components/Deposit';
import RegisterAccount from '../components/RegisterAccount';
import ApproveWithdrawal from '../components/ApproveWithdrawal';

const NdaiPage = () => {

  
  return (
    <div className='container'>
        <Deposit/>
        <hr></hr>
        <RegisterAccount/>
        <hr></hr>
        <ApproveWithdrawal contractInstance={contract} />
    </div>
  );
};

export default NdaiPage;