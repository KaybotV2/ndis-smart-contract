import React, { useState } from 'react';

// Components
import OfferService from './OfferService';
import DisplayServiceOffer from './DisplayServiceOffer';

// Hooks
import useFetchRequests from '../hooks/useFetchRequests';

const DisplayServiceBooking = () => {
  const bookings = useFetchRequests();
  const [redirectToServiceOffer, setRedirectToServiceOffer] = useState(false); 

  const handleRedirectToServiceOffer = () => {
    setRedirectToServiceOffer(true);
  };

  const pendingBookings = bookings.filter(booking => booking.status === 'Pending');

  if (pendingBookings.length === 0) {
    return <div className='component-container'>No pending bookings to display</div>;
  }

  return (
    <div className='display-service-booking component-container'>
      {redirectToServiceOffer ? (<><DisplayServiceOffer /></>) 
      :(<>
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
                  redirectToServiceOffer={handleRedirectToServiceOffer}
                />
              </div>
            )
          ))}
        </div>
      </>)}
    </div>
  );
};

export default DisplayServiceBooking;
