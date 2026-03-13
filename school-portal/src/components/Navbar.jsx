import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { getUnreadCount } from '../api'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const role = localStorage.getItem('role')
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await getUnreadCount()
        if (mounted) setUnread(res.count || 0)
      } catch (e) { }
    }
    if (localStorage.getItem('token')) {
      load()
      const iv = setInterval(load, 30000)
      return () => { mounted = false; clearInterval(iv) }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    navigate('/login')
    window.location.reload()
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          School Portal {role === 'admin' && '(Admin)'}
        </Typography>
        {user ? (
          <>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {user.name}
            </Typography>
            <Button color="inherit" component={RouterLink} to="/payment" sx={{ mr: 1 }}>
              💳 Payment
            </Button>
            <IconButton color="inherit" component={RouterLink} to="/messages" sx={{ mr: 1 }}>
              <Badge badgeContent={unread} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
