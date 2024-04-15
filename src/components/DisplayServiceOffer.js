import React, { useState, useEffect } from 'react';
import { contract } from '../resources/contract';
import web3 from '../resources/web3';

// Component
import WithdrawalRequest from './WithdrawalRequest';

const DisplayServiceOffer = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await contract.methods.getBookingRequests().call();
        const processedOffers = offers.map(offer => ({
          jobNumber: offer['jobNumber'],
          participant: offer['requester'],
          serviceDescription: offer['serviceDescription'],
          amount: web3.utils.fromWei(offer['amount'], 'ether'),
          status: Number(offer['status']) === 1 ? 'Service offered' : ''
        }));

        setOffers(processedOffers);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  if (offers.length === 0) {
    return <div>No offers to display</div>;
  }

  return (
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
            {offers.map((offer, index) => (
              // Only render the offer if its status is 'Service offered'
              offer.status === 'Service offered' && (
                <tr key={index}>
                  <td>{offer.jobNumber}</td>
                  <td>{offer.participant}</td>
                  <td>{offer.serviceDescription}</td>
                  <td>{offer.amount} Ether</td>
                  <td>{offer.status}</td>
                  <td>
                    <WithdrawalRequest amount={offer.amount} />
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayServiceOffer;
