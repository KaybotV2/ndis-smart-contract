import Web3 from 'web3';
import contractAbi from './ndis_smart_contract_abi.json';

const contractAddress = '0x61379b2A350a43836EA8aB948a3C6A85115FE195';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); 

function NdisContract() {

    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    return contract;
}

export default NdisContract;
