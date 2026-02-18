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
  Alert
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { getAdminStudents, addStudent } from '../api'

export default function AdminStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', enrollmentYear: new Date().getFullYear() })
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      const stud = await getAdminStudents()
      setStudents(stud || [])
    } catch (e) {
      console.error('Failed to load students', e)
    }
    setLoading(false)
  }

  const handleAddStudent = async () => {
    if (!formData.name || !formData.email) {
      alert('Please fill required fields')
      return
    }
    try {
      await addStudent(formData.name, formData.email, formData.enrollmentYear)
      setFormData({ name: '', email: '', enrollmentYear: new Date().getFullYear() })
      setOpenDialog(false)
      setSuccess('Student added successfully')
      setTimeout(() => setSuccess(''), 3000)
      loadStudents()
    } catch (e) {
      console.error('Failed to add student', e)
    }
  }

  if (loading) return <Typography>Loading...</Typography>

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Student Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Student
        </Button>
      </Box>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Enrollment Year</strong></TableCell>
                  <TableCell><strong>GPA</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map(student => (
                  <TableRow key={student.id} hover>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.enrollmentYear}</TableCell>
                    <TableCell>{student.gpa || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip label={student.status} color="success" size="small" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Enrollment Year"
            margin="normal"
            type="number"
            value={formData.enrollmentYear}
            onChange={(e) => setFormData({ ...formData, enrollmentYear: parseInt(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddStudent}>
            Add Student
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
