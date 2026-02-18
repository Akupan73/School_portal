import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, LinearProgress, Box } from '@mui/material';
import { attendanceData } from './parentSampleData';

const Attendance = ({ children }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Attendance Report</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Child Name</strong></TableCell>
                            <TableCell align="center"><strong>Present</strong></TableCell>
                            <TableCell align="center"><strong>Absent</strong></TableCell>
                            <TableCell align="center"><strong>Total Days</strong></TableCell>
                            <TableCell><strong>Percentage</strong></TableCell>
                            <TableCell><strong>Approved Leaves</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children.map((child) => {
                            const attend = attendanceData[child.id];
                            return attend ? (
                                <TableRow key={child.id}>
                                    <TableCell>{attend.childName}</TableCell>
                                    <TableCell align="center">{attend.present}</TableCell>
                                    <TableCell align="center">{attend.absent}</TableCell>
                                    <TableCell align="center">{attend.totalDays}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={attend.percentage}
                                                sx={{ flex: 1, height: 8, backgroundColor: '#e0e0e0' }}
                                                color={attend.percentage >= 95 ? 'success' : attend.percentage >= 85 ? 'warning' : 'error'}
                                            />
                                            <span>{attend.percentage.toFixed(1)}%</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{attend.leaves}</TableCell>
                                </TableRow>
                            ) : null;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Attendance;
