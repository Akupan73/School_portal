// Sample fee structure data
const feeStructure = {
    tuition: 1000,
    transportation: 200,
    hostel: 300,
    otherCharges: 100,
};

// Sample payment history data
const paymentHistory = [
    { id: 'p1', date: '2026-01-15', amount: 1000, method: 'Credit Card', notes: 'Tuition fee - Jan' },
    { id: 'p2', date: '2026-02-01', amount: 200, method: 'PayPal', notes: 'Transport fee - Feb' },
];

// Sample outstanding fees data
const outstandingFees = {
    totalDue: 500,
    dueDate: '2026-03-01',
};

export { feeStructure, paymentHistory, outstandingFees };