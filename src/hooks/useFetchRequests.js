import { useState, useEffect } from 'react';
import web3 from '../resources/web3';
import { contract } from '../resources/contract';

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
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Service Offered';
      case 2:
        return 'Waiting For Approval';
      case 3:
        return 'Approved';
      default:
        return '';
    }
  };

  return requests;
};

export default useFetchRequets;
