import { useState, useEffect } from 'react';
import web3 from '../contract/web3';
import { contract } from '../contract/contract';

const useFetchRequets = () => {
  const [requests, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const requests = await contract.methods.getBookingRequests().call();
        const processedOffers = requests.map(offer => ({
          jobNumber: offer['jobNumber'],
          participant: offer['requester'],
          serviceDescription: offer['serviceDescription'],
          amount: web3.utils.fromWei(offer['amount'], 'ether'),
          status: getStatus(Number(offer['status'])) // Determine status based on offer status
        }));
        setOffers(processedOffers);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchOffers();
  }, []);

  // Function to determine status based on offer status
  const getStatus = (status) => {
    const statusMap = {
      0: 'Pending',
      1: 'Service Offered',
      2: 'Waiting For Approval',
      3: 'Approved',
    };
    
    return statusMap[status] || ''; // Return the corresponding status string, or an empty string if not found
  };

  return requests;
};

export default useFetchRequets;
