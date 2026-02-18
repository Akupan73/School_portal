import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, List, ListItem, ListItemText, Button } from '@mui/material'
import { getAdminCourses } from '../api'

export default function FacultyCourses() {
  const [courses, setCourses] = useState([])

  useEffect(() => { load() }, [])
  const load = async () => {
    try {
      const data = await getAdminCourses()
      setCourses(data || [])
    } catch (e) { console.error(e) }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Courses (Faculty)</Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {courses.map(c => (
            <ListItem key={c.id} secondaryAction={<Button size="small">Manage</Button>}>
              <ListItemText primary={`${c.code} — ${c.name}`} secondary={`${c.instructor} • Enrolled: ${c.totalEnrolled}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
