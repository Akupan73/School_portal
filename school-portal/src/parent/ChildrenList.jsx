import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const ChildrenList = ({ children }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Children in School</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Child Name</strong></TableCell>
                            <TableCell><strong>Class</strong></TableCell>
                            <TableCell><strong>Section</strong></TableCell>
                            <TableCell><strong>Roll Number</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children.map((child) => (
                            <TableRow key={child.id}>
                                <TableCell>{child.name}</TableCell>
                                <TableCell>{child.class}</TableCell>
                                <TableCell>{child.section}</TableCell>
                                <TableCell>{child.rollNo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ChildrenList;
