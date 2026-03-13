import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './paymentStyles.css';
import { studentFees, paymentMethods } from './sampleData';

const StudentFeeAccount = ({ studentId = 'STU001' }) => {
    const student = studentFees.find(s => s.id === studentId);
    const [activeTab, setActiveTab] = useState('overview');

    if (!student) {
        return (
            <div className="payment-container error">
                <h2>Student Not Found</h2>
                <p>No fee account found for this student ID</p>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return '#4caf50';
            case 'pending':
                return '#ff9800';
            case 'outstanding':
                return '#f44336';
            default:
                return '#2196f3';
        }
    };

    return (
        <div className="payment-container">
            <h1>Fee Payment Account</h1>

            {/* Student Info Header */}
            <div className="student-info-card">
                <div className="info-row">
                    <div className="info-item">
                        <span className="label">Student Name:</span>
                        <span className="value">{student.studentName}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Student ID:</span>
                        <span className="value">{student.studentId}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Class:</span>
                        <span className="value">{student.classLevel}</span>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Fee Overview
                </button>
                <button
                    className={`tab-button ${activeTab === 'breakdown' ? 'active' : ''}`}
                    onClick={() => setActiveTab('breakdown')}
                >
                    Fee Breakdown
                </button>
                <button
                    className={`tab-button ${activeTab === 'status' ? 'active' : ''}`}
                    onClick={() => setActiveTab('status')}
                >
                    Payment Status
                </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="tab-content">
                    <div className="fee-summary">
                        <div className="summary-card highlight">
                            <h3>Total Fees Due</h3>
                            <p className="amount">GHS {student.totalDue.toLocaleString()}</p>
                            <p className="due-date">Due: {student.dueDate}</p>
                        </div>
                        <div className="summary-card success">
                            <h3>Total Paid</h3>
                            <p className="amount">GHS {student.totalPaid.toLocaleString()}</p>
                            <p className="percentage">{((student.totalPaid / student.totalDue) * 100).toFixed(0)}% paid</p>
                        </div>
                        <div 
                            className="summary-card"
                            style={{ borderLeft: `4px solid ${getStatusColor(student.status)}` }}
                        >
                            <h3>Outstanding Balance</h3>
                            <p className="amount">GHS {student.balance.toLocaleString()}</p>
                            <p className="status" style={{ color: getStatusColor(student.status) }}>
                                {student.status}
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-section">
                        <h3>Payment Progress</h3>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${(student.totalPaid / student.totalDue) * 100}%` }}
                            ></div>
                        </div>
                        <p className="progress-text">
                            {((student.totalPaid / student.totalDue) * 100).toFixed(0)}% of total fees paid
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions">
                        <h3>Quick Actions</h3>
                        <div className="action-buttons">
                            <Link to="/payment/methods" className="btn btn-primary">
                                View Payment Methods
                            </Link>
                            <Link to="/payment/history" className="btn btn-secondary">
                                View Payment History
                            </Link>
                            <button className="btn btn-success">
                                Make a Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Breakdown Tab */}
            {activeTab === 'breakdown' && (
                <div className="tab-content">
                    <h3>Fee Breakdown by Category</h3>
                    <div className="breakdown-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fee Category</th>
                                    <th>Amount</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(student.feeBreakdown).map(([category, amount]) => (
                                    <tr key={category}>
                                        <td className="category">
                                            {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                                        </td>
                                        <td className="amount">GHS {amount.toLocaleString()}</td>
                                        <td className="percentage">
                                            {((amount / student.totalDue) * 100).toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td><strong>Total</strong></td>
                                    <td><strong>GHS {student.totalDue.toLocaleString()}</strong></td>
                                    <td><strong>100%</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Status Tab */}
            {activeTab === 'status' && (
                <div className="tab-content">
                    <h3>Payment Status Summary</h3>
                    <div className="status-grid">
                        <div className="status-item">
                            <h4>Total Amount Due</h4>
                            <p className="value">GHS {student.totalDue.toLocaleString()}</p>
                        </div>
                        <div className="status-item">
                            <h4>Amount Paid</h4>
                            <p className="value success">GHS {student.totalPaid.toLocaleString()}</p>
                        </div>
                        <div className="status-item">
                            <h4>Outstanding Balance</h4>
                            <p className="value warning">GHS {student.balance.toLocaleString()}</p>
                        </div>
                        <div className="status-item">
                            <h4>Payment Status</h4>
                            <p className="value" style={{ color: getStatusColor(student.status) }}>
                                {student.status}
                            </p>
                        </div>
                    </div>

                    {student.balance > 0 && (
                        <div className="alert-section" style={{ borderLeft: `4px solid ${getStatusColor(student.status)}` }}>
                            <h4>⚠️ Outstanding Fees Notice</h4>
                            <p>You have outstanding fees of <strong>GHS {student.balance.toLocaleString()}</strong> due by <strong>{student.dueDate}</strong></p>
                            <p>Please arrange payment to avoid penalties. Contact the admin or parent for assistance.</p>
                        </div>
                    )}

                    {student.balance === 0 && (
                        <div className="alert-section success" style={{ borderLeft: `4px solid #4caf50` }}>
                            <h4>✓ Fees Paid</h4>
                            <p>All fees for the current academic year have been paid. Thank you!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentFeeAccount;
