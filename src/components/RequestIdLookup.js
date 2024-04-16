import React, { useState, useEffect } from 'react';
import { contract } from '../contract/contract';
import web3 from '../contract/web3';

const RequestIdLookup = ({ onSelectRequestId }) => {
  const [bookings, setBookings] = useState([]);
  const [jobNumberInput, setJobNumberInput] = useState('');
  const [foundRequestId, setFoundRequestId] = useState(null); // Initialize foundRequestId as null

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const events = await contract.getPastEvents('ServiceBooked', {
          fromBlock: 0,
          toBlock: 'latest'
        });

        const processedBookings = events.map(event => ({
          jobNumber: event.returnValues.jobNumber,
          participant: event.returnValues.participant,
          requestId: event.returnValues.requestId,
          serviceDescription: event.returnValues.serviceDescription,
          amount: web3.utils.fromWei(event.returnValues.amount, 'ether'),
          status: Number(event.returnValues.status)
        }));

        setBookings(processedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const findRequestIdByJobNumber = () => {
    const booking = bookings.find(booking => booking.jobNumber === jobNumberInput);
    if (booking) {
      setFoundRequestId(booking.requestId);
      onSelectRequestId(booking.requestId);
    } else {
      setFoundRequestId(null); // Reset foundRequestId if jobNumber is not found
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="jobNumberInput">Enter Job Number:</label>
        <input
          id="jobNumberInput"
          type="text"
          value={jobNumberInput}
          onChange={(e) => setJobNumberInput(e.target.value)}
        />
        <button onClick={findRequestIdByJobNumber}>Find Request ID</button>
      </div>
      {foundRequestId && ( // Only show the message if foundRequestId is not null
        <p>Request ID {foundRequestId} for Job Number {jobNumberInput} has been selected</p>
      )}
    </div>
  );
};

export default RequestIdLookup;
