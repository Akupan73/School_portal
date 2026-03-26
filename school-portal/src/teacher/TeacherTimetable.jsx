import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { timetableData } from './teacherSampleData';

const TeacherTimetable = ({ profile }) => {
    const data = timetableData['t1'] || [];
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Timetable & Events</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell>Period</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Class</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((r, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{r.day}</TableCell>
                                <TableCell>{r.period}</TableCell>
                                <TableCell>{r.subject}</TableCell>
                                <TableCell>{r.class}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Upcoming School Events:</Typography>
            <ul>
                {(profile.events || []).map((e, i) => <li key={i}>{e}</li>)}
            </ul>
        </Paper>
    );
};

export default TeacherTimetable;