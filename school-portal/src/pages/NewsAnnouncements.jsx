import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid
} from '@mui/material'
import { getNews, getAnnouncements } from '../api'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import AnnouncementIcon from '@mui/icons-material/Announcement'

export default function NewsAnnouncements() {
  const [news, setNews] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const [n, a] = await Promise.all([getNews(), getAnnouncements()])
        setNews(n || [])
        setAnnouncements(a || [])
      } catch (e) {
        console.error('Failed to load news/announcements', e)
      }
      setLoading(false)
    })()
  }, [])

  if (loading) return <Typography>Loading...</Typography>

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        News & Announcements
      </Typography>

      <Grid container spacing={3}>
        {/* Announcements */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AnnouncementIcon sx={{ mr: 1, color: '#f44336' }} />
                <Typography variant="h6">Important Announcements</Typography>
              </Box>
              <List>
                {announcements.length ? announcements.map((ann, idx) => (
                  <React.Fragment key={ann.id}>
                    <ListItem sx={{ mb: 1 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {ann.title}
                            <Chip
                              label={ann.priority || 'normal'}
                              size="small"
                              color={ann.priority === 'high' ? 'error' : 'default'}
                            />
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="textSecondary">
                              {ann.date}
                            </Typography>
                            <br />
                            {ann.message}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {idx < announcements.length - 1 && <Divider />}
                  </React.Fragment>
                )) : <Typography color="textSecondary">No announcements</Typography>}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* News */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NewspaperIcon sx={{ mr: 1, color: '#2196f3' }} />
                <Typography variant="h6">Latest News</Typography>
              </Box>
              <List>
                {news.length ? news.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <ListItem sx={{ mb: 1 }}>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="textSecondary">
                              {item.date}
                            </Typography>
                            <br />
                            {item.content}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {idx < news.length - 1 && <Divider />}
                  </React.Fragment>
                )) : <Typography color="textSecondary">No news</Typography>}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
