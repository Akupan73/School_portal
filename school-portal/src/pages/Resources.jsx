import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, TextField } from '@mui/material'
import { getResources, getCourses, submitAssignment } from '../api'

export default function Resources() {
  const [resources, setResources] = useState([])
  const [courses, setCourses] = useState([])
  const [course, setCourse] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    try {
      const r = await getResources()
      setResources(r || [])
      const c = await getCourses()
      setCourses(c || [])
    } catch (e) { console.error(e) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitAssignment(course, title, content, url)
      alert('Assignment submitted')
      setTitle(''); setContent(''); setUrl('')
    } catch (e) { console.error(e); alert('Failed to submit') }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Resources & Assignments</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Course Resources</Typography>
        <List>
          {resources.map(r => (
            <ListItem key={r.id} component="a" href={r.url} target="_blank" rel="noreferrer">
              <ListItemText primary={r.title} secondary={r.uploadedBy + ' • ' + r.date} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Submit Assignment</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 1, mt: 1 }}>
          <TextField select SelectProps={{ native: true }} value={course} onChange={e => setCourse(e.target.value)} label="Course" required>
            <option value="">Select course</option>
            {courses.map(c => <option key={c.id} value={c.code}>{c.code} — {c.name}</option>)}
          </TextField>
          <TextField value={title} onChange={e => setTitle(e.target.value)} label="Title" required />
          <TextField value={content} onChange={e => setContent(e.target.value)} label="Content / Notes" multiline minRows={3} />
          <TextField value={url} onChange={e => setUrl(e.target.value)} label="Resource URL (optional)" />
          <Button type="submit" variant="contained">Submit Assignment</Button>
        </Box>
      </Paper>
    </Box>
  )
}
