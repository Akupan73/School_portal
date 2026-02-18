import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material'
import { getAssignments } from '../api'

export default function Assignments() {
  const [subs, setSubs] = useState([])

  useEffect(() => { load() }, [])
  const load = async () => {
    try {
      const data = await getAssignments()
      setSubs(data || [])
    } catch (e) { console.error(e) }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>My Submissions</Typography>
      <Paper sx={{ p: 2 }}>
        {subs.length === 0 ? <Typography>No submissions</Typography> : (
          <List>
            {subs.map(s => (
              <ListItem key={s.id} alignItems="flex-start">
                <ListItemText primary={`${s.title} — ${s.courseCode}`} secondary={`Submitted: ${s.submittedAt}`} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}
