import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Alert,
  Divider
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { getAdminNews, postNews, postAnnouncement } from '../api'

export default function AdminNews() {
  const [activeTab, setActiveTab] = useState('news') // 'news' or 'announcements'
  const [news, setNews] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState({ title: '', content: '', message: '', priority: 'normal' })
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const n = await getAdminNews()
      setNews(n || [])
    } catch (e) {
      console.error('Failed to load news', e)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    try {
      if (activeTab === 'news') {
        if (!formData.title || !formData.content) {
          alert('Please fill required fields')
          return
        }
        await postNews(formData.title, formData.content)
      } else {
        if (!formData.title || !formData.message) {
          alert('Please fill required fields')
          return
        }
        await postAnnouncement(formData.title, formData.message, formData.priority)
      }
      setFormData({ title: '', content: '', message: '', priority: 'normal' })
      setOpenDialog(false)
      setSuccess(activeTab === 'news' ? 'News posted' : 'Announcement posted')
      setTimeout(() => setSuccess(''), 3000)
      loadData()
    } catch (e) {
      console.error('Failed to save', e)
    }
  }

  if (loading) return <Typography>Loading...</Typography>

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {activeTab === 'news' ? 'News Management' : 'Announcements'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          {activeTab === 'news' ? 'Post News' : 'Post Announcement'}
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box sx={{ mb: 3 }}>
        <Button
          variant={activeTab === 'news' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('news')}
          sx={{ mr: 2 }}
        >
          News
        </Button>
        <Button
          variant={activeTab === 'announcements' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('announcements')}
        >
          Announcements
        </Button>
      </Box>

      <Card>
        <CardContent>
          <List>
            {(activeTab === 'news' ? news : announcements).length ? (
              (activeTab === 'news' ? news : announcements).map((item, idx) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={item.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textSecondary">
                            {item.date}
                          </Typography>
                          <br />
                          {item.content || item.message}
                        </>
                      }
                    />
                  </ListItem>
                  {idx < (activeTab === 'news' ? news : announcements).length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <Typography color="textSecondary">No items</Typography>
            )}
          </List>
        </CardContent>
      </Card>

      {/* Post Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {activeTab === 'news' ? 'Post News' : 'Post Announcement'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {activeTab === 'news' ? (
            <TextField
              fullWidth
              label="Content"
              margin="normal"
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          ) : (
            <>
              <TextField
                fullWidth
                label="Message"
                margin="normal"
                multiline
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <TextField
                select
                fullWidth
                label="Priority"
                margin="normal"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                SelectProps={{ native: true }}
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
