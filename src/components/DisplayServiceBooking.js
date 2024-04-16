import React, { useState, useEffect } from 'react';
import { contract } from '../resources/contract';
import web3 from '../resources/web3';

// Components
import OfferService from './OfferService';

const DisplayServiceBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await contract.methods.getBookingRequests().call();
        const processedBookings = bookings.map(booking => ({
          jobNumber: booking['jobNumber'],
          participant: booking['requester'],
          serviceDescription: booking['serviceDescription'],
          amount: web3.utils.fromWei(booking['amount'], 'ether'),
          status: Number(booking['status']) === 0 ? 'Pending' : ''
        }));

        setBookings(processedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  if (bookings.length === 0) {
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
              <h3>Booking {index + 1}</h3>
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
