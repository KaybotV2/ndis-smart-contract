import React, { useState, useEffect } from 'react';
import {contract } from '../resources/contract'; 
import web3 from '../resources/web3'; 

const ServiceBooking = () => {
    const [jobNumber, setJobNumber] = useState('');
    const [bookingData, setBookingData] = useState({
        serviceDescription: '',
        amount: '',
        participantUnidNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Mapping of service descriptions to their respective amounts
    const serviceOptions = [
        { value: 'Consumables', amount: 0.00005 },
        { value: 'Daily Activities', amount: 0.00002 },
        { value: 'Assistance with Social and Community Participation', amount: 0.00005 },
        { value: 'Transport', amount: 0.00002 },
        { value: 'Specialised Disability Accommodation', amount: 2 },
        { value: 'Home Living', amount: 0.00005 },
        { value: 'Lifelong Learning', amount: 0.00005 },
        { value: 'Relationships', amount: 0.00005 },
        { value: 'Employment', amount: 0.00005 },
        { value: 'Support Coordination', amount: 1 }
    ];

    const generateJobNumber = () => {
        return Date.now().toString();
    };

    const handleServiceChange = (e) => {
        const selectedService = e.target.value;
        const selectedServiceOption = serviceOptions.find(option => option.value === selectedService);
        setBookingData({
            ...bookingData,
            serviceDescription: selectedService,
            amount: selectedServiceOption ? selectedServiceOption.amount : ''
        });
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!bookingData.serviceDescription || !bookingData.amount || !bookingData.participantUnidNumber) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            setLoading(true);
            let accounts = web3.eth.getAccounts();
            const generatedJobNumber = generateJobNumber();
            setJobNumber(generatedJobNumber);
            // Convert amount to wei
            const amountWei = web3.utils.toWei(bookingData.amount.toString(), 'ether');
            if (!accounts) {
                setError('Please select a MetaMask account.');
                return;
            }
            accounts = bookingData.participantUnidNumber
        
            await contract.methods.bookService(
                generatedJobNumber, 
                bookingData.serviceDescription, 
                amountWei, 
                bookingData.participantUnidNumber
            ).send({from: accounts});
            
            setError('');
            alert('Service booked successfully');
        } catch (error) {
            console.error('Error booking service:', error);
            setError('Failed to book service. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <div>
            <h2>Book Service</h2>
            <form onSubmit={handleBooking}>
                <div>
                    <label htmlFor="jobNumber">Job Number:</label>
                    <input
                        type="text"
                        id="jobNumber"
                        value={jobNumber}
                        readOnly
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="serviceDescription">Service Description:</label>
                    <select
                        id="serviceDescription"
                        value={bookingData.serviceDescription}
                        onChange={handleServiceChange}
                    >
                        <option value="">Select a service...</option>
                        {serviceOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.value}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={bookingData.amount}
                        readOnly
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="participantUnidNumber">Participant UNID Number:</label>
                    <input
                        type="text"
                        id="participantUnidNumber"
                        value={bookingData.participantUnidNumber}
                        onChange={(e) => setBookingData({ ...bookingData, participantUnidNumber: e.target.value })}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Booking...' : 'Book Service'}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default ServiceBooking;
