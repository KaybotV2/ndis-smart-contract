// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NDISSmartContract {
    using SafeMath for uint;

    enum RequestStatus { Pending, ServiceOffered, WaitingForApproval, Approved }

    struct Request {
        string jobNumber;
        address payable requester;
        uint amount;
        string participantUnidNumber;
        string serviceDescription;
        RequestStatus status;
    }

    mapping(bytes32 => Request) public requests;
    bytes32[] public requestIds;

    address public ndia;
    uint public participantFunds;
    mapping(address => bool) public ndisParticipant;
    mapping(address => bool) public ndisServiceProvider;

    constructor() {
        ndia = msg.sender;
    }

    modifier onlyNDIA() {
        require(msg.sender == ndia, "Permission denied: Only NDIS Agency can execute this.");
        _;
    }

    modifier onlyNdisParticipant() {
        require(ndisParticipant[msg.sender], "Permission denied: Only ndisParticipant can execute this.");
        _;
    }

        modifier onlyServiceProvider() {
        require(ndisServiceProvider[msg.sender], "Permission denied: Only ndisServiceProvider can execute this.");
        _;
    }

    modifier onlyNdisParticipantAndNdisServiceProvider() {
        require(ndisParticipant[msg.sender] || ndisServiceProvider[msg.sender], "Permission denied: Only ndisParticipant or ndisServiceProvider can execute this.");
        _;
    }

    function deposit() external payable onlyNDIA {
        updateParticipantFunds();
    }

    function registerAccount(address payable account, bool isParticipantAccount) external onlyNDIA {
        require(!ndisParticipant[account] && !ndisServiceProvider[account], "Account already registered.");

        if (isParticipantAccount) {
            ndisParticipant[account] = true;
        } else {
            ndisServiceProvider[account] = true;
        }

        emit AccountRegistered(account, isParticipantAccount);
    }

    function approveWithdrawal(bytes32 requestId) external onlyNDIA {
        require(requests[requestId].status != RequestStatus.Approved, "Request already approved");
        require(requests[requestId].status == RequestStatus.WaitingForApproval, "Request is not waiting for approval");

        address payable serviceProvider = requests[requestId].requester;
        serviceProvider.transfer(requests[requestId].amount);
        requests[requestId].status = RequestStatus.Approved;
        emit Withdrawal(requests[requestId].requester, requestId, requests[requestId].amount, requests[requestId].participantUnidNumber, requests[requestId].serviceDescription, requests[requestId].status);
    }


    function bookService(string memory jobNumber, string memory serviceDescription, uint amount, string memory participantUnidNumber) external onlyNdisParticipant {
        address payable requester = payable(msg.sender);
        bytes32 requestId = keccak256(abi.encodePacked(requester, serviceDescription, amount, participantUnidNumber));

        requests[requestId] = Request({
            jobNumber: jobNumber,
            requester: requester,
            amount: amount,
            participantUnidNumber: participantUnidNumber,
            serviceDescription: serviceDescription,
            status: RequestStatus.Pending
        });

        requestIds.push(requestId);

        emit ServiceBooked(jobNumber, msg.sender, requestId, serviceDescription, amount, RequestStatus.Pending);
    }

    function offerService(address payable participant, bytes32 requestId, string memory serviceDescription) external payable onlyServiceProvider {
        require(requests[requestId].status == RequestStatus.Pending, "Request not pending");

        requests[requestId].status = RequestStatus.ServiceOffered;

        emit ServiceOffered(msg.sender, participant, requestId, serviceDescription, RequestStatus.ServiceOffered);
    }

    function initiateWithdrawalRequest(bytes32 requestId, uint amount) external onlyNdisParticipantAndNdisServiceProvider {
        require(requests[requestId].status == RequestStatus.ServiceOffered, "Service not offered");
        require(participantFunds >= amount, "Insufficient funds!");

        // Deduct the withdrawal amount from participantFunds
        participantFunds -= amount;

        requests[requestId].status = RequestStatus.WaitingForApproval;

        emit WithdrawalRequestInitiated(msg.sender, requestId, amount, RequestStatus.WaitingForApproval);
    }


    function getBookingRequests() external view returns (Request[] memory) {
        Request[] memory result = new Request[](requestIds.length);
        for (uint i = 0; i < requestIds.length; i++) {
            result[i] = requests[requestIds[i]];
        }
        return result;
    }

    receive() external payable {
        updateParticipantFunds();
    }

    function updateParticipantFunds() private {
        participantFunds = participantFunds.add(address(this).balance);
    }

    event AccountRegistered(address indexed account, bool isParticipantAccount);
    event ServiceBooked(string jobNumber, address indexed participant, bytes32 requestId, string serviceDescription, uint amount, RequestStatus status);
    event ServiceOffered(address indexed serviceProvider, address indexed participant, bytes32 requestId, string serviceDescription, RequestStatus status);
    event Withdrawal(address indexed recipient, bytes32 requestId, uint amount, string participantUnidNumber, string serviceDescription, RequestStatus status);
    event WithdrawalRequestInitiated(address indexed recipient, bytes32 requestId, uint amount, RequestStatus status);
}
