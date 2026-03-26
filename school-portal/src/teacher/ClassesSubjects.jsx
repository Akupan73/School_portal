import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const ClassesSubjects = ({ profile }) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Classes & Subjects</Typography>
            <List>
                {profile.classes.map((cls) => (
                    <ListItem key={cls}>
                        <ListItemText primary={cls} secondary={profile.subjects.join(', ')} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ClassesSubjects;