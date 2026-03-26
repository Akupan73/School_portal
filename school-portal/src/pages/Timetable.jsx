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
  Chip,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material'
import { getTimetable } from '../api'
import { mockTimetable } from '../data/mockData'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function Timetable() {
  // for now, we simulate role; real app would come from auth context
  const isAdmin = false // change to true to unlock editing features

  const [selectedDay, setSelectedDay] = useState(0)
  const [viewMode, setViewMode] = useState('daily') // 'daily' or 'weekly'
  const [timetable, setTimetable] = useState(mockTimetable)
  const [alertMessage, setAlertMessage] = useState('')
  const [showAddEdit, setShowAddEdit] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)

  React.useEffect(() => {
    (async () => {
      try {
        const tt = await getTimetable()
        if (JSON.stringify(tt) !== JSON.stringify(timetable)) {
          setAlertMessage('Timetable has been updated. Please review the changes.')
        }
        setTimetable(tt)
      } catch (e) {
        // fallback
      }
    })()
  }, [])

  const dayTimetable = timetable.filter(item => item.day === DAYS[selectedDay])

  // compute clashes (simple overlapping detection)
  const conflicts = React.useMemo(() => {
    const clashes = []
    DAYS.forEach(day => {
      const entries = timetable.filter(i => i.day === day)
      // convert times to [start,end] in minutes
      const parse = t => {
        // crude parse: '10:00-11:30 AM' or '1:00-1:50 PM'
        const [range, meridiem] = t.split(' ')
        let [s, e] = range.split('-')
        const conv = time => {
          let [h, m] = time.split(':').map(Number)
          if (meridiem === 'PM' && h !== 12) h += 12
          if (meridiem === 'AM' && h === 12) h = 0
          return h * 60 + m
        }
        return [conv(s), conv(e)]
      }
      for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
          const [s1, e1] = parse(entries[i].time)
          const [s2, e2] = parse(entries[j].time)
          if (s1 < e2 && s2 < e1) {
            clashes.push({day, a: entries[i], b: entries[j]})
          }
        }
      }
    })
    return clashes
  }, [timetable])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const header = ['Day', 'Time', 'Course', 'Room', 'Instructor']
    const rows = timetable.map(i => [i.day, i.time, i.course, i.room, i.instructor])
    const csv = [header, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'timetable.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const beginAdd = entry => {
    setEditingEntry(entry || { day: DAYS[0], time: '', course: '', room: '', instructor: '' })
    setShowAddEdit(true)
  }

  const saveEntry = e => {
    e.preventDefault()
    if (editingEntry) {
      if (editingEntry.id != null) {
        setTimetable(tt => tt.map(t => (t.id === editingEntry.id ? editingEntry : t)))
      } else {
        setTimetable(tt => [...tt, { ...editingEntry, id: Date.now() }])
      }
    }
    setShowAddEdit(false)
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        School Timetable
      </Typography>

      {alertMessage && (
        <Box sx={{ mb: 2 }}>
          <Typography color="warning.main">{alertMessage}</Typography>
        </Box>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            <strong>Spring 2026 Schedule</strong> - Your weekly course schedule with instructors and rooms
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="outlined" onClick={handlePrint}>Print</Button>
        <Button variant="outlined" onClick={handleDownload}>Download CSV</Button>
        {isAdmin && <Button variant="contained" onClick={() => beginAdd()}>Add Class</Button>}
      </Box>

      <Tabs value={viewMode} onChange={(e, v) => setViewMode(v)} sx={{ mb: 2 }}>
        <Tab label="Daily" value="daily" />
        <Tab label="Weekly" value="weekly" />
      </Tabs>

      {conflicts.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="warning">
            <strong>Schedule conflicts detected:</strong>
            <ul>
              {conflicts.map((c, idx) => (
                <li key={idx}>
                  {c.day}: {c.a.course} ({c.a.time}) clashes with {c.b.course} ({c.b.time})
                </li>
              ))}
            </ul>
          </Alert>
        </Box>
      )}

      {viewMode === 'daily' ? (
        <>
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
                    {isAdmin && <TableCell><strong>Actions</strong></TableCell>}
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
                      {isAdmin && (
                        <TableCell>
                          <Button size="small" onClick={() => beginAdd(item)}>Edit</Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      ) : (
        // weekly grid
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Time</strong></TableCell>
                {DAYS.map(day => (
                  <TableCell key={day} align="center">
                    <strong>{day}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(
                new Set(timetable.map(i => i.time))
              )
                .sort()
                .map(time => (
                  <TableRow key={time}>
                    <TableCell>{time}</TableCell>
                    {DAYS.map(day => {
                      const entry = timetable.find(
                        i => i.day === day && i.time === time
                      )
                      return (
                        <TableCell key={day} align="center">
                          {entry ? (
                            <>
                              <Typography variant="body2">
                                {entry.course}
                              </Typography>
                              <Typography variant="caption">
                                {entry.instructor} / {entry.room}
                              </Typography>
                              {isAdmin && (
                                <Box>
                                  <Button size="small" onClick={() => beginAdd(entry)}>Edit</Button>
                                </Box>
                              )}
                            </>
                          ) : (
                            '-'    
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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

      {/* add/edit dialog */}
      <Dialog open={showAddEdit} onClose={() => setShowAddEdit(false)}>
        <DialogTitle>{editingEntry && editingEntry.id ? 'Edit Class' : 'Add Class'}</DialogTitle>
        <form onSubmit={saveEntry}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              select
              label="Day"
              value={editingEntry?.day || ''}
              onChange={e => setEditingEntry(de => ({ ...de, day: e.target.value }))}
            >
              {DAYS.map(d => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Time"
              value={editingEntry?.time || ''}
              onChange={e => setEditingEntry(de => ({ ...de, time: e.target.value }))}
            />
            <TextField
              label="Course"
              value={editingEntry?.course || ''}
              onChange={e => setEditingEntry(de => ({ ...de, course: e.target.value }))}
            />
            <TextField
              label="Room"
              value={editingEntry?.room || ''}
              onChange={e => setEditingEntry(de => ({ ...de, room: e.target.value }))}
            />
            <TextField
              label="Instructor"
              value={editingEntry?.instructor || ''}
              onChange={e => setEditingEntry(de => ({ ...de, instructor: e.target.value }))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddEdit(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
