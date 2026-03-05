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
  Alert,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { getCourses, getRegistered, registerCourse, dropCourse } from '../api'

export default function CourseRegistration() {
  const [available, setAvailable] = useState([])
  const [registered, setRegistered] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [message, setMessage] = useState('')
  const [filterDept, setFilterDept] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [detailTab, setDetailTab] = useState(0)
  const [selectedIds, setSelectedIds] = useState([]) // for bulk registration

  React.useEffect(() => {
    (async () => {
      try {
        const av = await getCourses()
        const reg = await getRegistered()
        setAvailable(av)
        setRegistered(reg.map(c => c.id))
      } catch (e) {
        // ignore, fallback to client mock data
      }
    })()
  }, [])

  const handleView = (course) => {
    setSelectedCourse(course)
    setDetailTab(0)
    setOpen(true)
  }

  const confirmRegister = () => {
    // if capacity full, treat as request
    if (selectedCourse.enrolled >= selectedCourse.capacity) {
      setMessage(`Requested enrollment for ${selectedCourse.name}. You will be notified if a slot opens.`)
    } else {
      registerCourse(selectedCourse.id).then(() => {
        setRegistered(prev => [...prev, selectedCourse.id])
      }).catch(() => {})
      setMessage(`Successfully registered for ${selectedCourse.name}`)
    }
    setOpen(false)
    setTimeout(() => setMessage(''), 4000)
  }

  const handleDrop = (courseId) => {
    dropCourse(courseId).then(() => {
      setRegistered(prev => prev.filter(id => id !== courseId))
    }).catch(() => {})
    setMessage('Course dropped successfully')
    setTimeout(() => setMessage(''), 4000)
    if (selectedCourse && selectedCourse.id === courseId) {
      setOpen(false)
    }
  }

  const isRegistered = (courseId) => registered.includes(courseId)
  const registeredCount = registered.length
  const totalCredits = available
    .filter(c => isRegistered(c.id))
    .reduce((sum, c) => sum + c.credits, 0)

  const toggleSelect = id => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleBulkRegister = () => {
    if (!selectedIds.length) return
    Promise.all(selectedIds.map(id => registerCourse(id))).then(() => {
      setRegistered(prev => [...prev, ...selectedIds])
      setMessage(`Registered for ${selectedIds.length} course(s). Proceed to payment.`)
      setSelectedIds([])
      // optionally navigate to payment
    }).catch(() => {})
    setTimeout(() => setMessage(''), 4000)
  }

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

      {/* filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          select
          label="Department"
          value={filterDept}
          onChange={e => setFilterDept(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {['Computer Science','Computer Engineering','Civil Engineering','Business & Management','Accounting','Mathematics','English','Physics','Chemistry','History']
            .map(d => (
              <MenuItem key={d} value={d}>{d}</MenuItem>
            ))}
        </TextField>
        <TextField
          select
          label="Level"
          value={filterLevel}
          onChange={e => setFilterLevel(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {['L100','L200','L300','L400','L500'].map(l => (
            <MenuItem key={l} value={l}>{l}</MenuItem>
          ))}
        </TextField>
      </Box>

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
            {available
              .filter(c => registered.includes(c.id))
              .filter(c => !filterDept || c.department === filterDept)
              .filter(c => !filterLevel || c.level === filterLevel)
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
                      color="primary"
                      size="small"
                      onClick={() => handleView(course)}
                      sx={{ mr: 1 }}
                    >
                      View
                    </Button>
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

      {/* quick registration form */}
      <Box sx={{ mb: 3, display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          select
          label="Select courses"
          value={selectedIds}
          onChange={e => setSelectedIds(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
          SelectProps={{ multiple: true }}
          sx={{ minWidth: 300 }}
        >
          {available
            .filter(c => !isRegistered(c.id))
            .map(c => (
              <MenuItem key={c.id} value={c.id}>
                {c.code} - {c.name}
              </MenuItem>
            ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedIds.length}
          onClick={handleBulkRegister}
        >
          Register Selected
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        Available Courses to Register
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="secondary" disabled={!selectedIds.length} onClick={handleBulkRegister}>
          Register & Pay ({selectedIds.length})
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell padding="checkbox" />
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
            {available
              .filter(c => !isRegistered(c.id))
              .filter(c => !filterDept || c.department === filterDept)
              .filter(c => !filterLevel || c.level === filterLevel)
              .map(course => (
                <TableRow key={course.id}>
                  <TableCell padding="checkbox">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(course.id)}
                      onChange={() => toggleSelect(course.id)}
                    />
                  </TableCell>
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
                      onClick={() => handleView(course)}
                    >
                      View
                    </Button>
                    {course.enrolled >= course.capacity && (
                      <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                        Full
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedCourse ? selectedCourse.name : ''}</DialogTitle>
        {selectedCourse && (
          <>
            <Tabs value={detailTab} onChange={(e,v) => setDetailTab(v)}>
              <Tab label="Overview" />
              <Tab label="Materials" />
              <Tab label="Assignments" />
              <Tab label="Announcements" />
              <Tab label="Resources" />
              <Tab label="Discussion" />
              <Tab label="Grades" />
              <Tab label="Quizzes" />
            </Tabs>
            <DialogContent>
              {detailTab === 0 && (
                <Box>
                  <Typography color="textSecondary">Code: {selectedCourse.code}</Typography>
                  <Typography color="textSecondary">Instructor: {selectedCourse.instructor}</Typography>
                  {selectedCourse.department && <Typography color="textSecondary">Dept: {selectedCourse.department}</Typography>}
                  {selectedCourse.level && <Typography color="textSecondary">Level: {selectedCourse.level}</Typography>}
                  <Typography color="textSecondary">Credits: {selectedCourse.credits}</Typography>
                  <Typography color="textSecondary">Schedule: {selectedCourse.schedule}</Typography>
                  {selectedCourse.teacherContact && (
                    <Typography color="textSecondary">Contact: {selectedCourse.teacherContact}</Typography>
                  )}
                  <Typography color="textSecondary" sx={{ mt: 2 }}>{selectedCourse.description}</Typography>
                </Box>
              )}
              {detailTab === 1 && (
                <List>
                  {(selectedCourse.materials || []).map(m => (
                    <ListItem key={m.id} component="a" href={m.url} target="_blank">
                      <ListItemText primary={m.title} />
                    </ListItem>
                  ))}
                  {!(selectedCourse.materials || []).length && <Typography>No materials</Typography>}
                </List>
              )}
              {detailTab === 2 && (
                <List>
                  {(selectedCourse.assignments || []).map(a => (
                    <ListItem key={a.id}>
                      <ListItemText primary={a.title} secondary={`Due: ${a.due}`} />
                    </ListItem>
                  ))}
                  {!(selectedCourse.assignments || []).length && <Typography>No assignments</Typography>}
                </List>
              )}
              {detailTab === 3 && (
                <List>
                  {(selectedCourse.announcements || []).map(a => (
                    <ListItem key={a.id}>
                      <ListItemText primary={a.message} secondary={a.date} />
                    </ListItem>
                  ))}
                  {!(selectedCourse.announcements || []).length && <Typography>No announcements</Typography>}
                </List>
              )}
              {detailTab === 4 && (
                <List>
                  {(selectedCourse.resources || []).map(r => (
                    <ListItem key={r.id} component="a" href={r.url} target="_blank">
                      <ListItemText primary={r.title} />
                    </ListItem>
                  ))}
                  {!(selectedCourse.resources || []).length && <Typography>No resources</Typography>}
                </List>
              )}
              {detailTab === 5 && (
                <Typography>Discussion forum placeholder</Typography>
              )}
              {detailTab === 6 && (
                <List>
                  {(selectedCourse.grades || []).map(g => (
                    <ListItem key={g.studentId}>
                      <ListItemText primary={`${g.studentId}: ${g.grade}`} secondary={g.remarks} />
                    </ListItem>
                  ))}
                  {!(selectedCourse.grades || []).length && <Typography>No grades available</Typography>}
                </List>
              )}
              {detailTab === 7 && (
                <Box>
                  {(selectedCourse.quizzes || []).map(q => (
                    <Box key={q.id} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1">{q.title}</Typography>
                      <List>
                        {q.questions.map((ques, qi) => (
                          <ListItem key={qi}>
                            <ListItemText primary={ques.text} />
                          </ListItem>
                        ))}
                      </List>
                      <Button size="small" variant="outlined">Start Quiz</Button>
                    </Box>
                  ))}
                  {!(selectedCourse.quizzes || []).length && <Typography>No quizzes available</Typography>}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
              {isRegistered(selectedCourse.id) ? (
                <Button variant="outlined" color="error" onClick={() => handleDrop(selectedCourse.id)}>
                  Drop
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={confirmRegister}>
                  Register
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  )
}
