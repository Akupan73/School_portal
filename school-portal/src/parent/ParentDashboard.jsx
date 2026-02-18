import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Paper } from '@mui/material';
import ChildrenList from './ChildrenList';
import CheckResults from './CheckResults';
import FeePayment from './FeePayment';
import Attendance from './Attendance';
import DisciplineList from './DisciplineList';
import { parentData } from './parentSampleData';

const countryCodes = [
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+39', country: 'Italy' },
];

const ParentDashboard = () => {
    const [countryCode, setCountryCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [parentInfo, setParentInfo] = useState(null);
    const [activeTab, setActiveTab] = useState('children');

    const handleVerify = () => {
        const fullPhoneNumber = `${countryCode}-${phoneNumber}`;
        if (parentData[fullPhoneNumber]) {
            setParentInfo({ ...parentData[fullPhoneNumber], phoneNumber: fullPhoneNumber });
            setIsVerified(true);
        } else {
            alert('Phone number not found in database');
            setIsVerified(false);
            setParentInfo(null);
        }
    };

    const handleLogout = () => {
        setIsVerified(false);
        setParentInfo(null);
        setCountryCode('+1');
        setPhoneNumber('');
        setActiveTab('children');
    };

    if (!isVerified) {
        return (
            <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
                <Typography variant="h4" sx={{ mb: 3 }}>Parent Portal - Verify Account</Typography>
                <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <TextField
                            select
                            label="Country Code"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            sx={{ minWidth: 150 }}
                        >
                            {countryCodes.map((item) => (
                                <MenuItem key={item.code} value={item.code}>
                                    {item.code} ({item.country})
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Phone Number"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            sx={{ flex: 1 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleVerify}
                            sx={{ height: 56 }}
                        >
                            Verify
                        </Button>
                    </Box>
                    <Typography variant="caption" sx={{ mt: 2, display: 'block', color: 'gray' }}>
                        Try: +1 with 555-0001, +1 with 555-0002, +44-20 with 1234-5678, +91 with 9876543210, +86-10 with 1234-5678, or +81-3 with 1234-5678
                    </Typography>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4">Parent Dashboard - {parentInfo.name}</Typography>
                    <Typography variant="body2" color="textSecondary">Email: {parentInfo.email}</Typography>
                    <Typography variant="body2" color="textSecondary">Address: {parentInfo.address}</Typography>
                </Box>
                <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                    variant={activeTab === 'children' ? 'contained' : 'outlined'}
                    onClick={() => setActiveTab('children')}
                >
                    Children List
                </Button>
                <Button
                    variant={activeTab === 'results' ? 'contained' : 'outlined'}
                    onClick={() => setActiveTab('results')}
                >
                    Check Results
                </Button>
                <Button
                    variant={activeTab === 'fees' ? 'contained' : 'outlined'}
                    onClick={() => setActiveTab('fees')}
                >
                    Fee Payment
                </Button>
                <Button
                    variant={activeTab === 'attendance' ? 'contained' : 'outlined'}
                    onClick={() => setActiveTab('attendance')}
                >
                    Attendance
                </Button>
                <Button
                    variant={activeTab === 'discipline' ? 'contained' : 'outlined'}
                    onClick={() => setActiveTab('discipline')}
                >
                    Discipline List
                </Button>
            </Box>

            {activeTab === 'children' && <ChildrenList children={parentInfo.children} />}
            {activeTab === 'results' && <CheckResults children={parentInfo.children} />}
            {activeTab === 'fees' && <FeePayment children={parentInfo.children} />}
            {activeTab === 'attendance' && <Attendance children={parentInfo.children} />}
            {activeTab === 'discipline' && <DisciplineList children={parentInfo.children} />}
        </Box>
    );
};

export default ParentDashboard;
