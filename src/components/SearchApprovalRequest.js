import React, { useState, useEffect } from 'react';
import { contract } from '../resources/contract';
import web3 from '../resources/web3';

// Components
import ApproveWithdrawal from './ApproveWithdrawal';
import ServiceOfferedLookup from './ServiceOfferedLookup';

const SearchApprovalRequest = ({requestId}) => {
  const [approvalRequests, setApprovalRequest] = useState([]);
  const [selectedParticipantIds, setSelectedParticipantIds] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const approvalRequests = await contract.methods.getBookingRequests().call();
        const processedOffers = approvalRequests.map(request => ({
          jobNumber: request['jobNumber'],
          participant: request['requester'],
          serviceDescription: request['serviceDescription'],
          amount: web3.utils.fromWei(request['amount'], 'ether'),
          status: Number(request['status']) === 2 ? "Waiting For Approval" : ""
        }));

        setApprovalRequest(processedOffers);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  const handleParticipantIdsSelection = (participantIds) => {
    setSelectedParticipantIds(participantIds);

  };

  const filteredRequests = selectedParticipantIds.length > 0
    ? approvalRequests.filter(request => selectedParticipantIds.includes(request.participant) && request.status === "Waiting For Approval")
    : (<div>Not found</div>);

  return (
    <div className='component-container'>
      <ServiceOfferedLookup onSelectParticipantIds={handleParticipantIdsSelection} />
      <div className="table-container">
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
            {filteredRequests.length > 0 ? filteredRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.jobNumber}</td>
                  <td>{request.participant}</td>
                  <td>{request.serviceDescription}</td>
                  <td>{request.amount} Ether</td>
                  <td>{request.status}</td>
                  <td>
                  <ApproveWithdrawal contractInstance={requestId} />
                  </td>
                </tr>
              )):(
                <tr>Enter your service provider address to find approvalRequests</tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchApprovalRequest;
