import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ClassesSubjects from './ClassesSubjects';
import AttendanceManager from './AttendanceManager';
import MarksEntry from './MarksEntry';
import TeacherTimetable from './TeacherTimetable';
import Communication from './Communication';
import { teacherProfiles } from './teacherSampleData';

const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState('classes');
    const teacherId = 't1'; // static for demo
    const profile = teacherProfiles[teacherId];

    return (
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Teacher Dashboard - {profile.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button variant={activeTab === 'classes' ? 'contained' : 'outlined'} onClick={() => setActiveTab('classes')}>Classes & Subjects</Button>
                <Button variant={activeTab === 'attendance' ? 'contained' : 'outlined'} onClick={() => setActiveTab('attendance')}>Attendance</Button>
                <Button variant={activeTab === 'marks' ? 'contained' : 'outlined'} onClick={() => setActiveTab('marks')}>Marks Entry</Button>
                <Button variant={activeTab === 'timetable' ? 'contained' : 'outlined'} onClick={() => setActiveTab('timetable')}>Timetable</Button>
                <Button variant={activeTab === 'comm' ? 'contained' : 'outlined'} onClick={() => setActiveTab('comm')}>Communication</Button>
            </Box>
            {activeTab === 'classes' && <ClassesSubjects profile={profile} />}
            {activeTab === 'attendance' && <AttendanceManager profile={profile} />}
            {activeTab === 'marks' && <MarksEntry profile={profile} />}
            {activeTab === 'timetable' && <TeacherTimetable profile={profile} />}
            {activeTab === 'comm' && <Communication profile={profile} />}
        </Box>
    );
};

export default TeacherDashboard;