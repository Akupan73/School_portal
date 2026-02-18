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
  Typography,
  Tabs,
  Tab,
  Chip
} from '@mui/material'
import { getTimetable } from '../api'
import { mockTimetable } from '../data/mockData'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [timetable, setTimetable] = useState(mockTimetable)

  React.useEffect(() => {
    (async () => {
      try {
        const tt = await getTimetable()
        setTimetable(tt)
      } catch (e) {
        // fallback
      }
    })()
  }, [])

  const dayTimetable = timetable.filter(item => item.day === DAYS[selectedDay])

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        School Timetable
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            <strong>Spring 2026 Schedule</strong> - Your weekly course schedule with instructors and rooms
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Select Day
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedDay} onChange={(e, v) => setSelectedDay(v)}>
          {DAYS.map((day, idx) => (
            <Tab key={day} label={day} value={idx} />
          ))}
        </Tabs>
      </Box>

      {dayTimetable.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="textSecondary">
              No classes scheduled for {DAYS[selectedDay]}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Time</strong></TableCell>
                <TableCell><strong>Course Code</strong></TableCell>
                <TableCell><strong>Course Name</strong></TableCell>
                <TableCell><strong>Instructor</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dayTimetable.map((item, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>
                    <Chip label={item.time} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>
                    {mockTimetable
                      .find(t => t.course === item.course)
                      ?.course || item.course}
                  </TableCell>
                  <TableCell>{item.instructor}</TableCell>
                  <TableCell>{item.room}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Weekly Overview
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                {DAYS.map(day => (
                  <TableCell key={day} align="center">
                    <strong>{day}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {DAYS.map(day => {
                    const count = timetable.filter(t => t.day === day).length
                  return (
                    <TableCell key={day} align="center">
                      <Typography variant="body2">
                        {count} class{count !== 1 ? 'es' : ''}
                      </Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mt: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
        <Typography variant="body2">
          <strong>Total Classes per Week:</strong> {mockTimetable.length}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Last updated: January 6, 2026. Contact the registrar for any changes.
        </Typography>
      </Box>
    </div>
  )
}
