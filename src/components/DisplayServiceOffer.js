import React from "react";

// Hooks
import useFetchRequests from '../hooks/useFetchRequests';

const DisplayServiceOffer = () => {
    const serviceOffers = useFetchRequests(); 

    const filteredServiceOffers = serviceOffers.filter(request => request.status === "Service Offered");

    if (filteredServiceOffers.length === 0) {
      return <div className='component-container'>No service offered to display</div>;
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
                  {filteredServiceOffers.map((request, index) => (
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
}

export default DisplayServiceOffer;
