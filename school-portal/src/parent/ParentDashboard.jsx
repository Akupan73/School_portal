import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Paper, Snackbar, Alert, List, ListItem, ListItemText } from '@mui/material';
import ChildrenList from './ChildrenList';
import CheckResults from './CheckResults';
import FeePayment from './FeePayment';
import Attendance from './Attendance';
import DisciplineList from './DisciplineList';
import { parentData } from './parentSampleData';
import RecommendSchool from './RecommendSchool'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const countryCodes = [
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+237', country: 'Cameroon' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+237', country: 'Cameroon' },
];

const ParentDashboard = () => {
    const [countryCode, setCountryCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [parentInfo, setParentInfo] = useState(null);
    const [activeTab, setActiveTab] = useState('children');
    const [notFound, setNotFound] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');

    const navigate = useNavigate()

    const mockSchools = [
        { id: 'SCH001', name: 'Green Valley High School', contact: 'info@greenvalley.edu', countryCode: '+1', city: 'New York' },
        { id: 'SCH002', name: 'Riverside Preparatory', contact: 'hello@riverside.edu', countryCode: '+1', city: 'Los Angeles' },
        { id: 'SCH003', name: 'St. Augustine Academy', contact: 'admin@staugustine.edu', countryCode: '+44', city: 'London' },
        { id: 'SCH004', name: 'Douala International School', contact: 'contact@doualais.edu.cm', countryCode: '+237', city: 'Douala' }
    ]

    const filteredSchools = mockSchools.filter(s => s.countryCode === countryCode && (!selectedCity || s.city === selectedCity));

    const handleVerify = () => {
        const fullPhoneNumber = `${countryCode}-${phoneNumber}`;
        if (parentData[fullPhoneNumber]) {
            setParentInfo({ ...parentData[fullPhoneNumber], phoneNumber: fullPhoneNumber });
            setNotFound(false);
            // try to extract a city from the parent's address to show nearby schools
            const addr = parentData[fullPhoneNumber].address || '';
            const parts = addr.split(',').map(s => s.trim()).filter(Boolean);
            const cityGuess = parts.length >= 2 ? parts[1].split(' ')[0] : (parts[0] || '');
            if (cityGuess) setSelectedCity(cityGuess);
            setIsVerified(true);
        } else {
            setIsVerified(false);
            setParentInfo(null);
            setNotFound(true)
            setNotification({ open: true, message: 'Phone number not found in database', severity: 'warning' })
        }
    };

    const handleLogout = () => {
        setIsVerified(false);
        setParentInfo(null);
        setCountryCode('+1');
        setPhoneNumber('');
        setActiveTab('children');
    };

    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' })
    const [selectedSchool, setSelectedSchool] = useState(null)
    const [recommendOpen, setRecommendOpen] = useState(false)

    const handleSendNotification = (msg, severity='info') => {
        setNotification({ open: true, message: msg, severity })
    }

    const handleChooseSchool = (school) => {
        setSelectedSchool(school)
        setRecommendOpen(true)
    }

    if (!isVerified) {
        return (
            <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', bgcolor: '#f5f9ff', borderRadius: 2 }}>
                <Typography variant="h4" sx={{ mb: 3, color: '#1565c0', fontWeight: 700 }}>Parent Portal - Verify Account</Typography>
                <Paper sx={{ p: 3, boxShadow: 3 }}>
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
                        Try: +1 with 555-0001, +1 with 555-0002, +44-20 with 1234-5678, +91 with 9876543210, +86-10 with 1234-5678, +81-3 with 1234-5678, or +237 with 650000000 (Cameroon)
                    </Typography>

                    {notFound && (
                        <Box sx={{ mt: 3 }}>
                            <Alert severity="warning">Phone number not found. We list other nearby schools you can recommend the app to.</Alert>

                            <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                                <TextField
                                    select
                                    label="City (optional)"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    sx={{ minWidth: 220 }}
                                >
                                    <MenuItem value="">All cities</MenuItem>
                                    {Array.from(new Set(mockSchools.filter(s => s.countryCode === countryCode).map(s => s.city))).map(c => (
                                        <MenuItem key={c} value={c}>{c}</MenuItem>
                                    ))}
                                </TextField>
                                <Typography variant="caption" sx={{ color: 'gray' }}>Showing schools in selected country and city</Typography>
                            </Box>

                            <List sx={{ mt: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                {filteredSchools.length > 0 ? (
                                    filteredSchools.map(s => (
                                        <ListItem key={s.id} secondaryAction={
                                            <Button variant="contained" size="small" onClick={() => handleChooseSchool(s)} sx={{ background: '#1976d2' }}>Recommend</Button>
                                        }>
                                            <ListItemText primary={s.name} secondary={`${s.contact} • ${s.city}`} />
                                        </ListItem>
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText primary="No recommended schools found for your selected country/city." secondary="You can recommend the app to a school in your area or register a school." />
                                        <Button component={RouterLink} to="/school/register" variant="outlined" size="small" sx={{ ml: 2 }}>Register School</Button>
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                    )}
                </Paper>

                <Snackbar open={notification.open} autoHideDuration={4000} onClose={() => setNotification({ ...notification, open: false })}>
                    <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} sx={{ width: '100%' }}>
                        {notification.message}
                    </Alert>
                </Snackbar>

                {selectedSchool && (
                    <RecommendSchool open={recommendOpen} onClose={() => setRecommendOpen(false)} school={selectedSchool} parentNumber={`${countryCode}-${phoneNumber}`} onSend={handleSendNotification} />
                )}
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', bgcolor: '#f5f9ff', borderRadius: 2 }}>
            <Paper sx={{ p: 2, mb: 3, bgcolor: '#1565c0', color: '#fff' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>Parent Dashboard</Typography>
                        <Typography variant="h6" sx={{ mt: 0.5 }}>{parentInfo.name}</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>Email: {parentInfo.email} • Address: {parentInfo.address}</Typography>
                    </Box>
                    <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
                </Box>
            </Paper>

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
