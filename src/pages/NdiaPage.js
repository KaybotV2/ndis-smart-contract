import React from 'react';
import { contract } from '../resources/contract'; 

import Deposit from '../components/Deposit';
import RegisterAccount from '../components/RegisterAccount';
import DisplayApprovalResquest from '../components/DisplayApprovalRequest'

const NdaiPage = () => {

  
  return (
    <div className='container'>
        <Deposit/>
        <hr></hr>
        <RegisterAccount/>
        <hr></hr>
        <DisplayApprovalResquest />
    </div>
  );
};

export default NdaiPage;