import React, { useState } from 'react';
import { contract } from '../resources/contract';

const ServiceOfferedLookup = ({ onSelectParticipantIds }) => {
  const [serviceProviderAddress, setServiceProviderAddress] = useState('');
  const [serviceOfferedEvents, setServiceOfferedEvents] = useState([]);

  const fetchServiceOfferedEvents = async (address) => {
    try {
      // Fetch past events of ServiceOffered
      const pastEvents = await contract.getPastEvents('ServiceOffered', {
        filter: { serviceProvider: address },
        fromBlock: 0,
        toBlock: 'latest'
      });

      // Extract participant IDs from the events
      const participantIds = pastEvents.map(event => event.returnValues.participant);

      setServiceOfferedEvents(pastEvents);
      onSelectParticipantIds(participantIds);
      setServiceProviderAddress(''); 
    } catch (error) {
      console.error('Error fetching service offered events:', error);
    }
  };

  const handleSearch = () => {
    fetchServiceOfferedEvents(serviceProviderAddress);
  };

  return (
    <div>
      <div>
        <label htmlFor="serviceProviderInput">Enter Service Provider Address:</label>
        <input
          id="serviceProviderInput"
          type="text"
          value={serviceProviderAddress}
          onChange={(e) => setServiceProviderAddress(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default ServiceOfferedLookup;
