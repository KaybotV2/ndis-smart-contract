import React from 'react';
import DisplayServiceOptionsList from '../components/DisplayServiceOptionsList ';

const ParticipantsPage = () => {

  const serviceOptions = [
    { value: 'Consumables', amount: 0.00005 },
    { value: 'Daily Activities', amount: 0.00002 },
    { value: 'Assistance with Social and Community Participation', amount: 0.00005 },
    { value: 'Transport', amount: 0.00002 },
    { value: 'Specialised Disability Accommodation', amount: 2 },
    { value: 'Home Living', amount: 0.00005 },
    { value: 'Lifelong Learning', amount: 0.00005 },
    { value: 'Relationships', amount: 0.00005 },
    { value: 'Employment', amount: 0.00005 },
    { value: 'Support Coordination', amount: 1 }
  ]; 

  return (
    <div className='container'>
        <DisplayServiceOptionsList serviceOptions={serviceOptions} />
    </div>
  );
};

export default ParticipantsPage;
