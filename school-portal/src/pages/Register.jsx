import React from 'react'
import { Box, Tabs, Tab, TextField, Button, Typography, Paper } from '@mui/material'
import { postApplication } from '../api'

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 2 }}>{children}</Box> : null
}

export default function Register() {
  const [tab, setTab] = React.useState(0)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [year, setYear] = React.useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await postApplication(name, email, phone, year)
      alert('Application submitted — admin will review it.')
      setName('')
      setEmail('')
      setPassword('')
      setPhone('')
      setYear('')
    } catch (err) {
      console.error(err)
      alert('Failed to submit application')
    }
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
            <TextField value={name} onChange={e => setName(e.target.value)} label="Full name" fullWidth margin="normal" required />
            <TextField value={email} onChange={e => setEmail(e.target.value)} label="Email" fullWidth margin="normal" required />
            <TextField value={password} onChange={e => setPassword(e.target.value)} label="Password" type="password" fullWidth margin="normal" required />
            <TextField value={password} onChange={e => setPassword(e.target.value)} label="Confirm Password" type="password" fullWidth margin="normal" required />
            <TextField value={phone} onChange={e => setPhone(e.target.value)} label="Parent Phone" fullWidth margin="normal" />
            <TextField value={year} onChange={e => setYear(e.target.value)} label="Enrollment year" fullWidth margin="normal" />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Register Student</Button>
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <TextField label="Full name" fullWidth margin="normal" required />
            <TextField label="Email" fullWidth margin="normal" required />
            <TextField label="Teacher ID" type="password" fullWidth margin="normal" required />
            <TextField label="Confirm ID" type="password" fullWidth margin="normal" required />
            <TextField label="Subject" fullWidth margin="normal" />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Register Teacher</Button>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  )
}
