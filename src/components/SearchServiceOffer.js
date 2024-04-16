import React, { useState } from 'react';
import web3 from '../contract/web3';

// Components
import WithdrawalRequest from './WithdrawalRequest';
import ServiceOfferedLookup from './ServiceOfferedLookup';

// Hooks
import useFetchRequests from '../hooks/useFetchRequests'; 

const SearchServiceOffer = () => {
  const requests = useFetchRequests(); 
  const [selectedParticipantIds, setSelectedParticipantIds] = useState([]);

  const handleParticipantIdsSelection = (participantIds) => {
    setSelectedParticipantIds(participantIds);
  };

  const filteredOffers = selectedParticipantIds.length > 0
    ? requests.filter(request => selectedParticipantIds.includes(request.participant) && request.status === "Service Offered")
    : [];

  return (
    <div className='component-container'>
      <ServiceOfferedLookup onSelectParticipantIds={handleParticipantIdsSelection} />
      <div className="table-container">
        <h2>My Service Offered</h2>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Job Number</th>
                <th>Participant</th>
                <th>Service Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.length > 0 ? filteredOffers.map((offer, index) => (
                <tr key={index}>
                  <td>{offer.jobNumber}</td>
                  <td>{offer.participant}</td>
                  <td>{offer.serviceDescription}</td>
                  <td>{offer.amount} Ether</td>
                  <td>{offer.status}</td>
                  <td>
                    <WithdrawalRequest amount={web3.utils.toWei(offer.amount, 'ether')} />
                  </td>
                </tr>
              )) : (
                <tr>Enter your service provider address to find your service offered</tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchServiceOffer;
