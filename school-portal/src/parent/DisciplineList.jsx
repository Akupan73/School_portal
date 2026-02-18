import React from 'react';
import { Paper, Typography, Box, Card, CardContent, Chip, Alert } from '@mui/material';
import { disciplineData } from './parentSampleData';

const DisciplineList = ({ children }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Discipline & Misconduct Records</Typography>
            {children.map((child) => {
                const discipline = disciplineData[child.id];
                return (
                    <Box key={child.id} sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {discipline.childName}
                        </Typography>
                        {discipline.incidents.length === 0 ? (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                ✓ No discipline issues recorded - Good conduct
                            </Alert>
                        ) : (
                            <Alert severity={discipline.incidents.some(i => i.severity === 'Major') ? 'error' : 'warning'} sx={{ mb: 2 }}>
                                {discipline.incidents.length} incident(s) on record
                            </Alert>
                        )}
                        {discipline.incidents.map((incident, idx) => (
                            <Card key={idx} sx={{ mb: 1, backgroundColor: incident.severity === 'Major' ? '#ffebee' : '#fff3e0' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 2 }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body2"><strong>Date:</strong> {incident.date}</Typography>
                                            <Typography variant="body2"><strong>Issue:</strong> {incident.issue}</Typography>
                                            <Typography variant="body2"><strong>Action Taken:</strong> {incident.action}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                            <Chip
                                                label={incident.severity}
                                                color={incident.severity === 'Major' ? 'error' : 'warning'}
                                                size="small"
                                                variant="filled"
                                            />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                );
            })}
        </Paper>
    );
};

export default DisciplineList;
