import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { feeData } from './parentSampleData';

const FeePayment = ({ children }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Fee Payment Status</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Child Name</strong></TableCell>
                            <TableCell align="center"><strong>Total Fees</strong></TableCell>
                            <TableCell align="center"><strong>Paid</strong></TableCell>
                            <TableCell align="center"><strong>Outstanding</strong></TableCell>
                            <TableCell align="center"><strong>Due Date</strong></TableCell>
                            <TableCell align="center"><strong>Status</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children.map((child) => {
                            const fee = feeData[child.id];
                            return fee ? (
                                <TableRow key={child.id}>
                                    <TableCell>{fee.childName}</TableCell>
                                    <TableCell align="center">${fee.totalFees}</TableCell>
                                    <TableCell align="center">${fee.paid}</TableCell>
                                    <TableCell align="center"><strong>${fee.outstanding}</strong></TableCell>
                                    <TableCell align="center">{fee.dueDate}</TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={fee.outstanding === 0 ? 'Paid' : 'Pending'}
                                            color={fee.outstanding === 0 ? 'success' : 'warning'}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : null;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Fee Breakdown</Typography>
            {children.map((child) => {
                const fee = feeData[child.id];
                return fee ? (
                    <Accordion key={child.id} sx={{ mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{fee.childName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <Typography variant="body2"><strong>Tuition:</strong> ${fee.breakdown.tuition}</Typography>
                                <Typography variant="body2"><strong>Transportation:</strong> ${fee.breakdown.transport}</Typography>
                                <Typography variant="body2"><strong>Hostel:</strong> ${fee.breakdown.hostel}</Typography>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ) : null;
            })}
        </Paper>
    );
};

export default FeePayment;
