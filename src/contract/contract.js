import contractAbi from './ndis_smart_contract_abi.json';
import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import web3 from './web3';

dotenv.config();

// Function to get contract instance
export const getContractInstance = () => {
    // State to store the contract instance
    const [contractInstance, setContractInstance] = useState(null);
    
    useEffect(() => {
        const initContractInstance = async () => {
            try {
                // Retrieve contract address and web3 provider from environment variables
                const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
                const web3Provider = process.env.REACT_APP_WEB3_PROVIDER;
                
                // Initialize web3 instance
                const provider = new web3.providers.HttpProvider(web3Provider);
                const web3Instance = new web3(provider);

                // Create contract instance
                const contractInstance = new web3Instance.eth.Contract(contractAbi, contractAddress);
                
                // Set the contract instance in the state
                setContractInstance(contractInstance);
            } catch (error) {
                console.error("Error initializing contract instance:", error);
            }
        };

        // Invoke the initialization function
        initContractInstance();
    }, []);

    // Return the contract instance
    return contractInstance;
};

// Initialize contract
export const contract = getContractInstance();
