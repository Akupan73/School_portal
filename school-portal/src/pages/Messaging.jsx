import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material'
import { getMessages, sendMessage } from '../api'
import MailIcon from '@mui/icons-material/Mail'

export default function Messaging() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [openCompose, setOpenCompose] = useState(false)
  const [composeData, setComposeData] = useState({ to: '', subject: '', message: '' })
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(() => {
    const init = async () => {
      await loadMessages()
      try {
        // mark messages read for this user so unread count updates
        await (await import('../api')).markAllRead()
      } catch (e) { }
    }
    init()
  }, [])

  const loadMessages = async () => {
    try {
      const msgs = await getMessages()
      setMessages(msgs || [])
    } catch (e) {
      console.error('Failed to load messages', e)
    }
    setLoading(false)
  }

  const handleSend = async () => {
    if (!composeData.to || !composeData.subject || !composeData.message) {
      alert('Please fill all fields')
      return
    }
    try {
      await sendMessage(user?.name || 'Student', composeData.to, composeData.subject, composeData.message)
      setComposeData({ to: '', subject: '', message: '' })
      setOpenCompose(false)
      loadMessages()
    } catch (e) {
      console.error('Failed to send message', e)
    }
  }

  if (loading) return <Typography>Loading...</Typography>

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Messages</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenCompose(true)}>
          New Message
        </Button>
      </Box>

      <Card>
        <CardContent>
          <List>
            {messages.length ? messages.map((msg, idx) => (
              <React.Fragment key={msg.id}>
                <ListItem sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1">{msg.subject}</Typography>
                        {!msg.read && <Chip label="New" size="small" color="primary" />}
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="textSecondary">
                          From: {msg.from} • {msg.date}
                        </Typography>
                        <br />
                        {msg.message.substring(0, 100)}...
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {idx < messages.length - 1 && <Divider />}
              </React.Fragment>
            )) : <Typography color="textSecondary">No messages</Typography>}
          </List>
        </CardContent>
      </Card>

      {/* Compose Dialog */}
      <Dialog open={openCompose} onClose={() => setOpenCompose(false)} fullWidth maxWidth="sm">
        <DialogTitle>New Message</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="To"
            placeholder="Recipient name"
            margin="normal"
            value={composeData.to}
            onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
          />
          <TextField
            fullWidth
            label="Subject"
            margin="normal"
            value={composeData.subject}
            onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            margin="normal"
            value={composeData.message}
            onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCompose(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
