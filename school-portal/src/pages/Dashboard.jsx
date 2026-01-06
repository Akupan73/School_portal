import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  LinearProgress,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import GradeIcon from '@mui/icons-material/Grade'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { mockStudentProfile, mockRegisteredCourses, mockResults, mockTimetable } from '../data/mockData'
import CourseRegistration from './CourseRegistration'
import Results from './Results'
import Timetable from './Timetable'

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 2 }}>{children}</Box> : null
}

export default function Dashboard() {
  const [tabValue, setTabValue] = useState(0)
  const upcomingClasses = mockTimetable.slice(0, 3)
  const recentGrades = mockResults.slice(0, 2)

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Box>
          <Typography variant="body2" color="textSecondary">
            {mockStudentProfile.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {mockStudentProfile.id}
          </Typography>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Registered Courses
                  </Typography>
                  <Typography variant="h5">{mockRegisteredCourses.length}</Typography>
                </Box>
                <SchoolIcon sx={{ fontSize: 40, color: '#1976d2', opacity: 0.5 }} />
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
                    Current GPA
                  </Typography>
                  <Typography variant="h5">{mockStudentProfile.gpa}</Typography>
                </Box>
                <GradeIcon sx={{ fontSize: 40, color: '#9c27b0', opacity: 0.5 }} />
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
                    Current Semester
                  </Typography>
                  <Typography variant="h6">{mockStudentProfile.currentSemester}</Typography>
                </Box>
                <ScheduleIcon sx={{ fontSize: 40, color: '#ff9800', opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Enrollment Status
                </Typography>
                <Chip label="Active" color="success" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Upcoming Classes */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Classes
              </Typography>
              <List dense>
                {upcomingClasses.map((cls, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={cls.course}
                      secondary={`${cls.day} at ${cls.time} - ${cls.room}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Grades
              </Typography>
              <List dense>
                {recentGrades.map((grade, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={grade.courseName}
                      secondary={`Grade: ${grade.letterGrade} (${grade.gpa})`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for Features */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label="Course Registration" />
            <Tab label="Results" />
            <Tab label="Timetable" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <CourseRegistration />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Results />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Timetable />
        </TabPanel>
      </Card>
    </div>
  )
}
