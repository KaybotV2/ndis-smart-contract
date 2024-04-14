import React from 'react';

const DisplayServiceBooking = ({ bookings }) => {
  // Check if bookings is an array
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <div>No bookings to display</div>;
  }

  // Define the keys to display
  const keysToDisplay = ['jobNumber', 'requester', 'amount', 'participantUnidNumber', 'serviceDescription', 'status'];

  return (
    <div>
      <h2>Booking Information</h2>
      {bookings.map((booking, index) => (
        <div key={index}>
          <h3>Booking {index + 1}</h3>
          <ul>
            {keysToDisplay.map(key => (
              // Check if the key exists in the booking object
              booking.hasOwnProperty(key) && (
                <li key={key}>
                  <strong>{key}:</strong> {typeof booking[key] === 'bigint' ? booking[key].toString() : booking[key]}
                </li>
              )
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DisplayServiceBooking;
