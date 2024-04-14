import React, {useState, useEffect} from 'react';

import Deposit from '../components/Deposit';
import RegisterAccount from '../components/RegisterAccount';

const NdaiPage = () => {

  return (
    <div className='container'>
        <Deposit/>
        <hr></hr>
        <RegisterAccount/>
    </div>
  );
};

export default NdaiPage;