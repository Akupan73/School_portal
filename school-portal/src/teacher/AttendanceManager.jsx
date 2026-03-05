import React, { useState } from 'react';
import { Paper, Typography, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { studentList, attendanceRecords } from './teacherSampleData';

const AttendanceManager = ({ profile }) => {
    const [selectedClass, setSelectedClass] = useState(profile.classes[0]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [records, setRecords] = useState(() => attendanceRecords[selectedClass] || {});

    const handleMark = () => {
        const students = studentList[selectedClass] || [];
        const newRec = { ...records };
        students.forEach((s) => {
            if (!newRec[s.id]) newRec[s.id] = 'present';
        });
        attendanceRecords[selectedClass] = newRec;
        setRecords(newRec);
    };

    const toggle = (id) => {
        const newRec = { ...records };
        newRec[id] = newRec[id] === 'present' ? 'absent' : 'present';
        attendanceRecords[selectedClass] = newRec;
        setRecords(newRec);
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Attendance Manager</Typography>
            <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} sx={{ mb: 2 }}>
                {profile.classes.map((cls) => (
                    <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                ))}
            </Select>
            <TextField type="date" value={date} onChange={(e) => setDate(e.target.value)} sx={{ mb: 2, ml:2 }} />
            <Button variant="contained" onClick={handleMark} sx={{ mb: 2, ml:2 }}>Initialize</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(studentList[selectedClass] || []).map((s) => (
                            <TableRow key={s.id} onClick={() => toggle(s.id)} sx={{ cursor: 'pointer' }}>
                                <TableCell>{s.name}</TableCell>
                                <TableCell>{records[s.id] || 'absent'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default AttendanceManager;