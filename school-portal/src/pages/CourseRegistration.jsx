import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert
} from '@mui/material'
import { mockAvailableCourses, mockRegisteredCourses } from '../data/mockData'

export default function CourseRegistration() {
  const [registered, setRegistered] = useState(
    mockRegisteredCourses.map(c => c.id)
  )
  const [open, setOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [message, setMessage] = useState('')

  const handleRegister = (course) => {
    setSelectedCourse(course)
    setOpen(true)
  }

  const confirmRegister = () => {
    setRegistered([...registered, selectedCourse.id])
    setMessage(`Successfully registered for ${selectedCourse.name}`)
    setOpen(false)
    setTimeout(() => setMessage(''), 4000)
  }

  const handleDrop = (courseId) => {
    setRegistered(registered.filter(id => id !== courseId))
    setMessage('Course dropped successfully')
    setTimeout(() => setMessage(''), 4000)
  }

  const isRegistered = (courseId) => registered.includes(courseId)
  const registeredCount = registered.length
  const totalCredits = mockRegisteredCourses
    .filter(c => isRegistered(c.id))
    .reduce((sum, c) => sum + c.credits, 0)

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Course Registration
      </Typography>
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography>
            Registered Courses: <strong>{registeredCount}</strong> | Total Credits: <strong>{totalCredits}</strong>
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Your Registered Courses
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Course Code</strong></TableCell>
              <TableCell><strong>Course Name</strong></TableCell>
              <TableCell><strong>Instructor</strong></TableCell>
              <TableCell><strong>Credits</strong></TableCell>
              <TableCell><strong>Schedule</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockRegisteredCourses
              .filter(c => isRegistered(c.id))
              .map(course => (
                <TableRow key={course.id}>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>{course.schedule}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDrop(course.id)}
                    >
                      Drop
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom>
        Available Courses to Register
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Code</strong></TableCell>
              <TableCell><strong>Course Name</strong></TableCell>
              <TableCell><strong>Instructor</strong></TableCell>
              <TableCell><strong>Credits</strong></TableCell>
              <TableCell><strong>Schedule</strong></TableCell>
              <TableCell><strong>Slots</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockAvailableCourses
              .filter(c => !isRegistered(c.id))
              .map(course => (
                <TableRow key={course.id}>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>{course.schedule}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${course.capacity - course.enrolled}/${course.capacity}`}
                      color={course.capacity - course.enrolled > 5 ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleRegister(course)}
                    >
                      Register
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Registration</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <>
              <Typography><strong>{selectedCourse.name}</strong></Typography>
              <Typography color="textSecondary">Code: {selectedCourse.code}</Typography>
              <Typography color="textSecondary">Instructor: {selectedCourse.instructor}</Typography>
              <Typography color="textSecondary">Credits: {selectedCourse.credits}</Typography>
              <Typography color="textSecondary">Schedule: {selectedCourse.schedule}</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }}>{selectedCourse.description}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={confirmRegister} variant="contained" color="primary">
            Confirm Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
