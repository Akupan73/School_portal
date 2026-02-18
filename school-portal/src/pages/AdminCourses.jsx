import React, { useState, useEffect } from 'react'
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
  TextField,
  Typography,
  Alert,
  IconButton
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { getAdminCourses, addCourse, updateCourse, deleteCourse } from '../api'

export default function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    instructor: '',
    credits: 3,
    schedule: '',
    capacity: 30,
    description: ''
  })
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const cour = await getAdminCourses()
      setCourses(cour || [])
    } catch (e) {
      console.error('Failed to load courses', e)
    }
    setLoading(false)
  }

  const handleOpenDialog = (course = null) => {
    if (course) {
      setEditingId(course.id)
      setFormData({
        code: course.code,
        name: course.name,
        instructor: course.instructor,
        credits: course.credits,
        schedule: course.schedule,
        capacity: course.capacity,
        description: course.description
      })
    } else {
      setEditingId(null)
      setFormData({ code: '', name: '', instructor: '', credits: 3, schedule: '', capacity: 30, description: '' })
    }
    setOpenDialog(true)
  }

  const handleSaveCourse = async () => {
    if (!formData.code || !formData.name || !formData.instructor) {
      alert('Please fill required fields')
      return
    }
    try {
      if (editingId) {
        await updateCourse(editingId, formData)
        setSuccess('Course updated successfully')
      } else {
        await addCourse(formData.code, formData.name, formData.instructor, formData.credits, formData.schedule, formData.capacity, formData.description)
        setSuccess('Course added successfully')
      }
      setOpenDialog(false)
      setTimeout(() => setSuccess(''), 3000)
      loadCourses()
    } catch (e) {
      console.error('Failed to save course', e)
    }
  }

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId)
        setSuccess('Course deleted successfully')
        setTimeout(() => setSuccess(''), 3000)
        loadCourses()
      } catch (e) {
        console.error('Failed to delete course', e)
      }
    }
  }

  if (loading) return <Typography>Loading...</Typography>

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Course Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Course
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell><strong>Code</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Instructor</strong></TableCell>
                  <TableCell><strong>Credits</strong></TableCell>
                  <TableCell><strong>Schedule</strong></TableCell>
                  <TableCell><strong>Capacity</strong></TableCell>
                  <TableCell><strong>Enrolled</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map(course => (
                  <TableRow key={course.id} hover>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.schedule}</TableCell>
                    <TableCell>{course.capacity}</TableCell>
                    <TableCell>
                      <Chip
                        label={course.enrolled}
                        color={course.capacity - course.enrolled > 5 ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(course)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteCourse(course.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Course Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Edit Course' : 'Add New Course'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Course Code"
            margin="normal"
            required
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            disabled={!!editingId}
          />
          <TextField
            fullWidth
            label="Course Name"
            margin="normal"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Instructor"
            margin="normal"
            required
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
          />
          <TextField
            fullWidth
            label="Credits"
            margin="normal"
            type="number"
            value={formData.credits}
            onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
          />
          <TextField
            fullWidth
            label="Schedule"
            margin="normal"
            placeholder="e.g., Mon, Wed 10:00-11:30 AM"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
          />
          <TextField
            fullWidth
            label="Capacity"
            margin="normal"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveCourse}>
            {editingId ? 'Update' : 'Add'} Course
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
