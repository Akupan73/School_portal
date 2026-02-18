import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { paymentHistory } from './sampleData';

const PaymentDetail = () => {
    const { id } = useParams();
    const payment = paymentHistory.find(p => p.id === id);

    if (!payment) {
        return (
            <div>
                <h1>Payment Not Found</h1>
                <p>No payment found for ID: {id}</p>
                <Link to="/payment">Back to Payments</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Payment Details</h1>
            <p><strong>ID:</strong> {payment.id}</p>
            <p><strong>Date:</strong> {payment.date}</p>
            <p><strong>Amount:</strong> {payment.amount}</p>
            <p><strong>Method:</strong> {payment.method}</p>
            {payment.notes && <p><strong>Notes:</strong> {payment.notes}</p>}
            <Link to="/payment">Back to Payments</Link>
        </div>
    );
};

export default PaymentDetail;
