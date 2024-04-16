import contractAbi from './ndis_smart_contract_abi.json';
import { CONTRACT_ADDRESS } from './constant';
import web3 from './web3';


// Function to get contract instance
export const getContractInstance = () => {
    return new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
}

// Initialize contract
export const contract = getContractInstance();
