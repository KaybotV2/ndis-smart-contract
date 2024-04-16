import React from 'react';

// Hooks
import useFetchRequets from '../hooks/useFetchRequests';

const DisplayWithdrawRequest = () => {
    const withdrawRequests = useFetchRequets(); 

    const pendingApproval = withdrawRequests.filter(booking => booking.status === 'Waiting For Approval');

  if (pendingApproval.length === 0) {
    return <div className='component-container'>No pending bookings to display</div>;
  }


  return (
    <div className='component-container'>
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
              </tr>
            </thead>
            <tbody>
              {pendingApproval.map((request, index) => (
                <tr key={index}>
                  <td>{request.jobNumber}</td>
                  <td>{request.participant}</td>
                  <td>{request.serviceDescription}</td>
                  <td>{request.amount} Ether</td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayWithdrawRequest;
