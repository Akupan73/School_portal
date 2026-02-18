import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText } from '@mui/material'
import { postAttendance, getAttendance } from '../api'

export default function FacultyAttendance() {
  const [records, setRecords] = useState([])
  const [courseCode, setCourseCode] = useState('')
  const [studentId, setStudentId] = useState('')
  const [date, setDate] = useState('')
  const [present, setPresent] = useState(true)

  useEffect(() => { load() }, [])
  const load = async () => {
    try {
      const data = await getAttendance()
      setRecords(data || [])
    } catch (e) { console.error(e) }
  }

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      await postAttendance(courseCode, studentId, date || undefined, present)
      alert('Attendance recorded')
      setCourseCode(''); setStudentId(''); setDate(''); setPresent(true)
      await load()
    } catch (e) { console.error(e); alert('Failed') }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Attendance</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box component="form" onSubmit={handlePost} sx={{ display: 'grid', gap: 1 }}>
          <TextField value={courseCode} onChange={e => setCourseCode(e.target.value)} label="Course Code" required />
          <TextField value={studentId} onChange={e => setStudentId(e.target.value)} label="Student ID" required />
          <TextField value={date} onChange={e => setDate(e.target.value)} label="Date (YYYY-MM-DD)" />
          <TextField value={present} onChange={e => setPresent(e.target.value === 'true')} label="Present (true/false)" />
          <Button type="submit" variant="contained">Record Attendance</Button>
        </Box>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Recent Records</Typography>
        <List>
          {records.map(r => (
            <ListItem key={r.id}><ListItemText primary={`${r.courseCode} • ${r.studentId} • ${r.present ? 'Present' : 'Absent'}`} secondary={`${r.date} — ${r.recordedBy}`} /></ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
