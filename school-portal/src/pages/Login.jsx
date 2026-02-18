import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Paper, Alert, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await login({ email, password })
      if (result && result.profile && result.token && result.role) {
        localStorage.setItem('user', JSON.stringify(result.profile))
        localStorage.setItem('role', result.role)
        localStorage.setItem('token', result.token)
        if (result.role === 'admin') {
          navigate('/admin/dashboard')
        } else if (result.role === 'faculty') {
          navigate('/faculty/courses')
        } else {
          navigate('/dashboard')
        }
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('Connection error: ' + err.message)
      console.error('Login error:', err)
    }
    setLoading(false)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Paper sx={{ p: 4, width: 450 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          School Portal Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          <strong>Demo Credentials:</strong>
        </Typography>
        <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography variant="body2">
            <strong>Admin (Akupan Desmond Ekwen):</strong><br />
            akupandesmondekwen947@gmail.com<br />
            D1010@yaho.com
          </Typography>
        </Box>
        <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>Student (Demo):</strong><br />
            john.doe@school.com<br />
            student123
          </Typography>
        </Box>
        <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1, mt: 2 }}>
          <Typography variant="body2">
            <strong>Faculty (Demo):</strong><br />
            prof.jones@school.com<br />
            faculty123
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}
