import { useState, useEffect } from 'react';
import web3 from '../resources/web3';
import { contract } from '../resources/contract';

const useFetchOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await contract.methods.getBookingRequests().call();
        const processedOffers = offers.map(offer => ({
          jobNumber: offer['jobNumber'],
          participant: offer['requester'],
          serviceDescription: offer['serviceDescription'],
          amount: web3.utils.fromWei(offer['amount'], 'ether'),
          status: Number(offer['status']) === 1 ? "Service Offered" : ""
        }));
        setOffers(processedOffers);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchOffers();
  }, []);

  return offers;
};

export default useFetchOffers;
