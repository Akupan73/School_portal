import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import SchoolIcon from '@mui/icons-material/School'
import AssignmentIcon from '@mui/icons-material/Assignment'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { getAdminDashboard, getAdminStudents, getAdminCourses } from '../api'

export default function AdminDashboard() {
  const [dashData, setDashData] = useState(null)
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const adminProfile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    (async () => {
      try {
        const [dash, stud, cour] = await Promise.all([
          getAdminDashboard(),
          getAdminStudents(),
          getAdminCourses()
        ])
        setDashData(dash)
        setStudents(stud)
        setCourses(cour)
      } catch (e) {
        console.error('Failed to load admin data', e)
      }
    })()
  }, [])

  if (!dashData) {
    return <Typography>Loading...</Typography>
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Box>
          <Typography variant="body2" color="textSecondary">
            {adminProfile.name}
          </Typography>
          <Chip label={adminProfile.position} size="small" color="primary" />
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Students
                  </Typography>
                  <Typography variant="h5">{dashData.totalStudents}</Typography>
                </Box>
                <PeopleIcon sx={{ fontSize: 40, color: '#1976d2', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Courses
                  </Typography>
                  <Typography variant="h5">{dashData.totalCourses}</Typography>
                </Box>
                <SchoolIcon sx={{ fontSize: 40, color: '#9c27b0', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Registrations
                  </Typography>
                  <Typography variant="h5">{dashData.totalRegistrations}</Typography>
                </Box>
                <AssignmentIcon sx={{ fontSize: 40, color: '#ff9800', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Average GPA
                  </Typography>
                  <Typography variant="h5">{dashData.averageGPA}</Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#4caf50', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          {dashData.recentActivity.map((activity, idx) => (
            <Box key={idx} sx={{ mb: 1.5, pb: 1.5, borderBottom: idx < dashData.recentActivity.length - 1 ? '1px solid #eee' : 'none' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2"><strong>{activity.activity}</strong></Typography>
                <Typography variant="body2" color="textSecondary">{activity.date}</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">{activity.details}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Students ({students.length})
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Year</strong></TableCell>
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
                    <TableCell>{student.gpa}</TableCell>
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

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Course Overview ({courses.length})
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell><strong>Code</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Instructor</strong></TableCell>
                  <TableCell><strong>Credits</strong></TableCell>
                  <TableCell><strong>Capacity</strong></TableCell>
                  <TableCell><strong>Enrolled</strong></TableCell>
                  <TableCell><strong>Available</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map(course => (
                  <TableRow key={course.id} hover>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.capacity}</TableCell>
                    <TableCell>{course.enrolled}</TableCell>
                    <TableCell>
                      <Chip
                        label={course.capacity - course.enrolled}
                        color={course.capacity - course.enrolled > 5 ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  )
}
