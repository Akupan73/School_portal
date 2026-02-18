import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from '@mui/material';
import { resultsData } from './parentSampleData';

const CheckResults = ({ children }) => {
    const getGradeColor = (grade) => {
        if (grade === 'A+' || grade === 'A') return 'success';
        if (grade === 'B+' || grade === 'B') return 'info';
        return 'warning';
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Academic Results</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Child Name</strong></TableCell>
                            <TableCell align="center"><strong>Math</strong></TableCell>
                            <TableCell align="center"><strong>English</strong></TableCell>
                            <TableCell align="center"><strong>Science</strong></TableCell>
                            <TableCell align="center"><strong>Hindi</strong></TableCell>
                            <TableCell align="center"><strong>Overall</strong></TableCell>
                            <TableCell align="center"><strong>Grade</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children.map((child) => {
                            const result = resultsData[child.id];
                            return result ? (
                                <TableRow key={child.id}>
                                    <TableCell>{result.name}</TableCell>
                                    <TableCell align="center">{result.math}</TableCell>
                                    <TableCell align="center">{result.english}</TableCell>
                                    <TableCell align="center">{result.science}</TableCell>
                                    <TableCell align="center">{result.hindi}</TableCell>
                                    <TableCell align="center"><strong>{result.overall}</strong></TableCell>
                                    <TableCell align="center">
                                        <Chip label={result.grade} color={getGradeColor(result.grade)} />
                                    </TableCell>
                                </TableRow>
                            ) : null;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default CheckResults;
