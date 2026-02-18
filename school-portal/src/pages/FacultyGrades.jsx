import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText } from '@mui/material'
import { getGrades, postGrade } from '../api'

export default function FacultyGrades() {
  const [grades, setGrades] = useState([])
  const [studentId, setStudentId] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [gradeValue, setGradeValue] = useState('')
  const [remarks, setRemarks] = useState('')

  useEffect(() => { load() }, [])
  const load = async () => {
    try {
      const data = await getGrades()
      setGrades(data || [])
    } catch (e) { console.error(e) }
  }

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      await postGrade(studentId, courseCode, gradeValue, remarks)
      alert('Grade posted')
      setStudentId(''); setCourseCode(''); setGradeValue(''); setRemarks('')
      await load()
    } catch (e) { console.error(e); alert('Failed') }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Grades</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box component="form" onSubmit={handlePost} sx={{ display: 'grid', gap: 1 }}>
          <TextField value={studentId} onChange={e => setStudentId(e.target.value)} label="Student ID" required />
          <TextField value={courseCode} onChange={e => setCourseCode(e.target.value)} label="Course Code" required />
          <TextField value={gradeValue} onChange={e => setGradeValue(e.target.value)} label="Grade" required />
          <TextField value={remarks} onChange={e => setRemarks(e.target.value)} label="Remarks" />
          <Button type="submit" variant="contained">Post Grade</Button>
        </Box>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Recent Grades</Typography>
        <List>
          {grades.map(g => (
            <ListItem key={g.id}><ListItemText primary={`${g.studentId} • ${g.courseCode} • ${g.grade}`} secondary={`${g.remarks} — ${g.date}`} /></ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
