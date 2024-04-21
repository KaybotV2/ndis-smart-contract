import contractAbi from './ndis_smart_contract_abi.json';
import dotenv from 'dotenv';
import web3 from './web3';

dotenv.config();

// Function to get contract instance
const getContractInstance = async () => {
    try {
        // Retrieve contract address and web3 provider from environment variables
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const web3Provider = process.env.REACT_APP_WEB3_PROVIDER;

        // Check if contract address and web3 provider are available
        if (!contractAddress || !web3Provider) {
            throw new Error('Contract address or web3 provider not provided in environment variables.');
        }

        // Initialize web3 instance
        const provider = new web3.providers.HttpProvider(web3Provider);
        const web3Instance = new web3(provider);

        // Create contract instance
        const contractInstance = new web3Instance.eth.Contract(contractAbi, contractAddress);

        return contractInstance;
    } catch (error) {
        console.error("Error initializing contract instance:", error);
        throw error; // Rethrow the error for handling in the caller
    }
};

// Initialize contract
export const contract = async () => {
    try {
        return await getContractInstance();
    } catch (error) {
        console.error("Error initializing contract:", error);
        return null;
    }
};
