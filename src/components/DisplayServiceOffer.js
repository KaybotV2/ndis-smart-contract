import React, { useState, useEffect } from 'react';
import { contract } from '../resources/contract';
import web3 from '../resources/web3';

// Components
import WithdrawalRequest from './WithdrawalRequest';
import ServiceOfferedLookup from './ServiceOfferedLookup';

const DisplayServiceOffer = () => {
  const [offers, setOffers] = useState([]);
  const [selectedParticipantIds, setSelectedParticipantIds] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await contract.methods.getBookingRequests().call();
        const processedOffers = offers.map(offer => ({
          jobNumber: offer['jobNumber'],
          participant: offer['requester'],
          serviceDescription: offer['serviceDescription'],
          amount: web3.utils.fromWei(offer['amount'], 'ether'),
          status: Number(offer['status']) === 1 ? "Service Offered" : ""
        }));

        setOffers(processedOffers);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  const handleParticipantIdsSelection = (participantIds) => {
    setSelectedParticipantIds(participantIds);

  };

  const filteredOffers = selectedParticipantIds.length > 0
    ? offers.filter(offer => selectedParticipantIds.includes(offer.participant) && offer.status === "Service Offered")
    : (<div>Not found</div>);

  return (
    <div>
      <ServiceOfferedLookup onSelectParticipantIds={handleParticipantIdsSelection} />
      <div className="table-container">
        <h2>Service Offered Information</h2>
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
              )):(
                <tr>Enter your service provider address to find your service offered</tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayServiceOffer;
