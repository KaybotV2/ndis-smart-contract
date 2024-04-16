import { useState, useEffect } from 'react';
import web3 from '../resources/web3';
import { contract } from '../resources/contract';

const useFetchWithdrawRequest = () => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWithdrawRequests = async () => {
      try {
        setLoading(true);
        const requests = await contract.methods.getBookingRequests().call();
        const processedRequests = requests.map(request => ({
          jobNumber: request['jobNumber'],
          participant: request['requester'],
          serviceDescription: request['serviceDescription'],
          amount: web3.utils.fromWei(request['amount'], 'ether'),
          status: Number(request['status']) === 2 ? "Waiting For Approval" : ""
        }));
        setWithdrawRequests(processedRequests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching withdrawal requests:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchWithdrawRequests();
  }, []); // No dependencies needed

  return { withdrawRequests, loading, error };
};

export default useFetchWithdrawRequest;
