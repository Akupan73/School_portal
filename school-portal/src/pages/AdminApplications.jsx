import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, List, ListItem, ListItemText, Button, Divider } from '@mui/material'
import { getApplications, approveApplication, rejectApplication } from '../api'

export default function AdminApplications() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getApplications()
      setApps(data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this application?')) return
    try {
      await approveApplication(id)
      await load()
      alert('Application approved')
    } catch (e) {
      console.error(e)
      alert('Failed to approve')
    }
  }

  const handleReject = async (id) => {
    const reason = window.prompt('Rejection reason (optional):')
    try {
      await rejectApplication(id, reason)
      await load()
      alert('Application rejected')
    } catch (e) {
      console.error(e)
      alert('Failed to reject')
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Applications</Typography>
      <Paper sx={{ p: 2 }}>
        {loading ? <Typography>Loading…</Typography> : (
          apps.length === 0 ? <Typography>No applications</Typography> : (
            <List>
              {apps.map(a => (
                <React.Fragment key={a.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`${a.name} — ${a.email}`}
                      secondary={
                        <>
                          <div>Status: {a.status}</div>
                          <div>Phone: {a.phone}</div>
                          <div>Year: {a.enrollmentYear}</div>
                        </>
                      }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {a.status === 'pending' && (
                        <>
                          <Button variant="contained" color="primary" onClick={() => handleApprove(a.id)}>Approve</Button>
                          <Button variant="outlined" color="error" onClick={() => handleReject(a.id)}>Reject</Button>
                        </>
                      )}
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )
        )}
      </Paper>
    </Box>
  )
}
