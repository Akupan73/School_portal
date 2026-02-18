import React from 'react';
import { Link } from 'react-router-dom';
import { feeStructure, paymentHistory, outstandingFees } from './sampleData';

const PaymentModule = () => {
    return (
        <div>
            <h1>Fee Payment Module</h1>
            <h2>Fee Structure</h2>
            <ul>
                <li>Tuition: {feeStructure.tuition}</li>
                <li>Transportation: {feeStructure.transportation}</li>
                <li>Hostel: {feeStructure.hostel}</li>
                <li>Other Charges: {feeStructure.otherCharges}</li>
            </ul>
            <h2>Payment History</h2>
            <ul>
                {paymentHistory.map((payment) => (
                    <li key={payment.id}>
                        <Link to={`/payment/${payment.id}`}>{payment.date}: {payment.amount} via {payment.method}</Link>
                    </li>
                ))}
            </ul>
            <h2>Outstanding Fees</h2>
            <p>Total Due: {outstandingFees.totalDue}</p>
            <p>Due Date: {outstandingFees.dueDate}</p>
        </div>
    );
};

export default PaymentModule;