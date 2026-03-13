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
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.profile))
        localStorage.setItem('role', result.role)
        localStorage.setItem('token', result.token)
        if (result.role === 'admin') {
          navigate('/admin/dashboard')
        } else {
          navigate('/dashboard')
        }
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('Connection error: ' + err.message)
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
         
      </Paper>
    </Box>
  )
}
