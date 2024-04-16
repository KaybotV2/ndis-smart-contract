import React from 'react';
import web3 from '../resources/web3';

// Components
import OfferService from './OfferService';

// Hooks
import useFetchRequests from '../hooks/useFetchRequests';

const DisplayServiceBooking = () => {
  const bookings = useFetchRequests(); 

  if (!bookings || bookings.length === 0) {
    return <div>No bookings to display</div>;
  }

  return (
    <div className='display-service-booking'>
      <h2>Booking Information</h2>
      <div className='booking-container-display-flex'>
        {bookings.map((booking, index) => (
          // Only render the booking if its status is 'Pending'
          booking.status === 'Pending' && (
            <div key={index}>
              <h3>Booking {index + Date.now()}</h3>
              <ul>
                <li>
                  <strong>Job Number:</strong> {booking.jobNumber}
                </li>
                <li>
                  <strong>Participant:</strong> {booking.participant}
                </li>
                <li>
                  <strong>Service Description:</strong> {booking.serviceDescription}
                </li>
                <li>
                  <strong>Amount:</strong> {booking.amount} Ether
                </li>
                <li>
                  <strong>Status:</strong> {booking.status}
                </li>
              </ul>
              <OfferService
                participant={booking.participant}
                serviceDescription={booking.serviceDescription}
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default DisplayServiceBooking;
