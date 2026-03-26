import React, { useState } from 'react';
import { Paper, Typography, Select, MenuItem, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { studentList, marksData } from './teacherSampleData';

const MarksEntry = ({ profile }) => {
    const [cls, setCls] = useState(profile.classes[0]);
    const [student, setStudent] = useState('');
    const [mark, setMark] = useState('');

    const handleSave = () => {
        if (student && mark) {
            marksData[student] = marksData[student] || [];
            marksData[student].push({ class: cls, subject: profile.subjects[0], mark });
            setMark('');
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Marks Entry</Typography>
            <Select value={cls} onChange={(e) => setCls(e.target.value)} sx={{ mb: 2 }}>
                {profile.classes.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
            </Select>
            <Select value={student} onChange={(e) => setStudent(e.target.value)} sx={{ mb: 2, ml:2 }}>
                <MenuItem value="">Select student</MenuItem>
                {(studentList[cls] || []).map((s) => (
                    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                ))}
            </Select>
            <TextField label="Marks" value={mark} onChange={(e) => setMark(e.target.value)} sx={{ mb: 2, ml:2 }} />
            <Button variant="contained" onClick={handleSave} sx={{ mb: 2, ml:2 }}>Save</Button>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student</TableCell>
                            <TableCell>Entries</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(marksData).map(([sid, entries]) => (
                            <TableRow key={sid}>
                                <TableCell>{sid}</TableCell>
                                <TableCell>{entries.map((e) => `${e.subject}:${e.mark}`).join(', ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default MarksEntry;