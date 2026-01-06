import React from 'react'
import { Box, Tabs, Tab, TextField, Button, Typography, Paper } from '@mui/material'

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 2 }}>{children}</Box> : null
}

export default function Register() {
  const [tab, setTab] = React.useState(0)
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Registration submitted (UI only)')
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ width: 600, mt: 2 }}>
        <Typography variant="h5" sx={{ p: 2 }}>Register</Typography>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Student" />
          <Tab label="Teacher" />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <TextField label="Full name" fullWidth margin="normal" required />
            <TextField label="Email" fullWidth margin="normal" required />
            <TextField label="Password" type="password" fullWidth margin="normal" required />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Register Student</Button>
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <TextField label="Full name" fullWidth margin="normal" required />
            <TextField label="Email" fullWidth margin="normal" required />
            <TextField label="Password" type="password" fullWidth margin="normal" required />
            <TextField label="Subject" fullWidth margin="normal" />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Register Teacher</Button>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  )
}
