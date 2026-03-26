import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const Communication = () => {
    const [message, setMessage] = useState('');
    const [outbox, setOutbox] = useState([]);

    const send = () => {
        if (message.trim()) {
            setOutbox([...outbox, message]);
            setMessage('');
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Communicate with Parents</Typography>
            <TextField
                label="Message to parents"
                fullWidth
                multiline
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={send}>Send</Button>
            <Typography variant="subtitle1" sx={{ mt: 3 }}>Outbox</Typography>
            <List>
                {outbox.map((msg, idx) => (
                    <ListItem key={idx}>
                        <ListItemText primary={msg} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default Communication;