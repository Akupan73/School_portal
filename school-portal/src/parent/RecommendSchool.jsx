import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography
} from '@mui/material'

export default function RecommendSchool({ open, onClose, school, parentNumber, onSend }) {
  const [message, setMessage] = useState(
    `Dear ${school.name},\n\nI recommend that your school consider adopting this Parent Portal app to improve parent-school communication.\n\nParent Number: ${parentNumber}`
  )
  const [loading, setLoading] = useState(false)

  const handleSend = () => {
    setLoading(true)
    // simulate sending email (bypass backend)
    setTimeout(() => {
      setLoading(false)
      onSend(`Recommendation email sent to ${school.name}`, 'success')
      onClose()
    }, 800)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ background: 'linear-gradient(135deg,#1976d2 0%,#1565c0 100%)', color: '#fff' }}>
        Recommend App to {school.name}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This will create a message to the school's contact (simulated). The app will not contact the backend.
        </Typography>
        <TextField
          label="Message"
          fullWidth
          multiline
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSend} variant="contained" disabled={loading} sx={{ background: '#1976d2' }}>
          {loading ? 'Sending...' : 'Send Recommendation'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
