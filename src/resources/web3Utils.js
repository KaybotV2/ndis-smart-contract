// web3Utils.js
import Web3 from 'web3';
import contractAbi from './ndis_smart_contract_abi.json';
import { CONTRACT_ADDRESS, WEB3_PROVIDER } from './constant';

const web3 = new Web3(WEB3_PROVIDER);

export { web3 };

export const getContractInstance = () => {
    return new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
}

export const contract = getContractInstance();

