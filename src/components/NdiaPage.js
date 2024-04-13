import React, {useState, useEffect} from 'react';

import Deposit from './Deposit';
import RegisterAccount from './RegisterAccount';

const NdaiPage = () => {

  return (
    <div>
        <Deposit/>
        <hr></hr>
        <RegisterAccount/>
    </div>
  );
};

export default NdaiPage;