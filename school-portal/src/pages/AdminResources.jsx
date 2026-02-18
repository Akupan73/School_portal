import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, TextField, Button, List, ListItem, ListItemText, Divider } from '@mui/material'
import { getResources, postResource } from '../api'

export default function AdminResources() {
  const [resources, setResources] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [desc, setDesc] = useState('')

  const load = async () => {
    try {
      const data = await getResources()
      setResources(data || [])
    } catch (e) { console.error(e) }
  }

  useEffect(() => { load() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      await postResource(title, url, desc)
      setTitle(''); setUrl(''); setDesc('')
      await load()
      alert('Resource added')
    } catch (e) { console.error(e); alert('Failed to add resource') }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Resources</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box component="form" onSubmit={handleAdd} sx={{ display: 'grid', gap: 1 }}>
          <TextField value={title} onChange={e => setTitle(e.target.value)} label="Title" required />
          <TextField value={url} onChange={e => setUrl(e.target.value)} label="URL" required />
          <TextField value={desc} onChange={e => setDesc(e.target.value)} label="Description" />
          <Button type="submit" variant="contained">Add Resource</Button>
        </Box>
      </Paper>
      <Paper sx={{ p: 2 }}>
        {resources.length === 0 ? <Typography>No resources</Typography> : (
          <List>
            {resources.map(r => (
              <React.Fragment key={r.id}>
                <ListItem>
                  <ListItemText primary={r.title} secondary={r.description || r.url} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}
