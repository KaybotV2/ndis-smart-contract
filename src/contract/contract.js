import contractAbi from './ndis_smart_contract_abi.json';
import web3 from './web3';

export const contract = new web3.eth.Contract(contractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);

