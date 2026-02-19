import React, { useState } from 'react'
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function SchoolRegistration() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', adminName: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // simulate registration
    const registered = JSON.parse(localStorage.getItem('registeredSchools') || '[]')
    registered.push({ id: Date.now(), ...form, createdAt: new Date().toISOString() })
    localStorage.setItem('registeredSchools', JSON.stringify(registered))
    setSubmitted(true)
    setTimeout(() => navigate('/login'), 1200)
  }

  if (submitted) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, maxWidth: 600 }}>
          <Alert severity="success">School registered successfully. Redirecting to login...</Alert>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, maxWidth: 700 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#1565c0', fontWeight: 'bold' }}>School Registration</Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>Fill this form to register your school and enable login for administrators.</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField label="School Name" name="name" value={form.name} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
          <TextField label="Contact Email" name="email" value={form.email} onChange={handleChange} type="email" fullWidth required sx={{ mb: 2 }} />
          <TextField label="Administrator Name" name="adminName" value={form.adminName} onChange={handleChange} fullWidth required sx={{ mb: 3 }} />
          <Button type="submit" variant="contained" sx={{ background: '#1976d2' }}>Register School</Button>
        </Box>
      </Paper>
    </Box>
  )
}
