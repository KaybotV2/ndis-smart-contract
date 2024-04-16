import React, { useState } from 'react';

// Components
import ApproveWithdrawal from './ApproveWithdrawal';
import ServiceOfferedLookup from './ServiceOfferedLookup';

// Hooks
import useFetchWithdrawRequest from '../hooks/useFetchWithdrawRequest'; 

const SearchApprovalRequest = ({ requestId }) => {
  const { withdrawRequests, loading, error } = useFetchWithdrawRequest(); 
  const [selectedParticipantIds, setSelectedParticipantIds] = useState([]);

  const handleParticipantIdsSelection = (participantIds) => {
    setSelectedParticipantIds(participantIds);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  const filteredRequests = selectedParticipantIds.length > 0
    ? withdrawRequests.filter(request => selectedParticipantIds.includes(request.participant) && request.status === "Waiting For Approval")
    : []; 

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
              )) : (
                <tr>Enter your service provider address to find requests</tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchApprovalRequest;
