import React from 'react';

// Hooks
import useFetchRequets from '../hooks/useFetchRequests';

const DisplayWithdrawRequest = () => {
    const withdrawRequests = useFetchRequets(); 

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
              {withdrawRequests.map((request, index) => (
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
