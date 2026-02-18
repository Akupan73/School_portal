import express from 'express'
import cors from 'cors'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { nanoid } from 'nanoid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

const file = join(__dirname, 'data', 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()
// Initialize defaults
db.data ||= {}
db.data.profile ||= {}
db.data.availableCourses ||= []
db.data.registeredCourses ||= []
db.data.results ||= []
db.data.timetable ||= []
db.data.news ||= []
db.data.messages ||= []
db.data.announcements ||= []

// Admin: Akupan Desmond Ekwen
const ADMIN_CREDENTIALS = {
  email: 'akupandesmondekwen947@gmail.com',
  password: 'D1010@yaho.com',
  whatsapp: '670932755'
}

// Simple init data when empty
if (!db.data._initialized) {
  db.data.profile = {
    id: 'STU001',
    name: 'John Doe',
    email: 'john.doe@school.com',
    enrollmentYear: 2023,
    gpa: 3.8,
    currentSemester: 'Spring 2026'
  }

  db.data.availableCourses = [
    { id: 'CS101', code: 'CS101', name: 'Introduction to Computer Science', instructor: 'Dr. Smith', credits: 3, schedule: 'Mon, Wed 10:00-11:30 AM', capacity: 30, enrolled: 28, description: 'Fundamentals of programming and algorithms' },
    { id: 'MATH201', code: 'MATH201', name: 'Calculus II', instructor: 'Prof. Johnson', credits: 4, schedule: 'Tue, Thu 2:00-3:30 PM', capacity: 25, enrolled: 24, description: 'Advanced calculus concepts' },
    { id: 'ENG150', code: 'ENG150', name: 'English Literature', instructor: 'Dr. Williams', credits: 3, schedule: 'Mon, Wed, Fri 1:00-1:50 PM', capacity: 35, enrolled: 32, description: 'British and American literature' },
    { id: 'PHYS150', code: 'PHYS150', name: 'Physics I', instructor: 'Dr. Brown', credits: 4, schedule: 'Tue, Thu 10:00-11:30 AM', capacity: 20, enrolled: 18, description: 'Mechanics and thermodynamics' }
  ]

  db.data.registeredCourses = [
    { id: 'CS101', code: 'CS101', name: 'Introduction to Computer Science', instructor: 'Dr. Smith', credits: 3, schedule: 'Mon, Wed 10:00-11:30 AM', location: 'Building A, Room 201', registrationDate: '2025-12-15' },
    { id: 'MATH201', code: 'MATH201', name: 'Calculus II', instructor: 'Prof. Johnson', credits: 4, schedule: 'Tue, Thu 2:00-3:30 PM', location: 'Building B, Room 105', registrationDate: '2025-12-15' }
  ]

  db.data.results = [
    { courseCode: 'CS101', courseName: 'Introduction to Computer Science', instructor: 'Dr. Smith', credits: 3, semester: 'Fall 2025', midterm: 88, finalExam: 92, projectWork: 95, participation: 90, letterGrade: 'A', gpa: 4.0 },
    { courseCode: 'MATH201', courseName: 'Calculus II', instructor: 'Prof. Johnson', credits: 4, semester: 'Fall 2025', midterm: 85, finalExam: 88, projectWork: 87, participation: 86, letterGrade: 'A-', gpa: 3.8 }
  ]

  db.data.timetable = [
    { day: 'Monday', time: '10:00-11:30 AM', course: 'CS101', room: 'A-201', instructor: 'Dr. Smith' },
    { day: 'Tuesday', time: '2:00-3:30 PM', course: 'MATH201', room: 'B-105', instructor: 'Prof. Johnson' },
    { day: 'Wednesday', time: '10:00-11:30 AM', course: 'CS101', room: 'A-201', instructor: 'Dr. Smith' }
  ]

  db.data.news = [
    { id: nanoid(), title: 'Semester Exams Schedule Released', date: '2026-01-05', content: 'Final exams schedule for Spring 2026 has been published.' },
    { id: nanoid(), title: 'New Library Resources Available', date: '2026-01-03', content: 'Check out our newly added online resources in the library.' }
  ]

  db.data.announcements = [
    { id: nanoid(), title: 'School Closure Notice', date: '2026-01-06', message: 'School will be closed on January 15 for staff development day.', priority: 'high' },
    { id: nanoid(), title: 'Important: Course Add/Drop Deadline', date: '2026-01-04', message: 'Last day to add or drop courses is January 20, 2026.', priority: 'normal' }
  ]

  db.data.messages = [
    { id: nanoid(), from: 'Dr. Smith', to: 'John Doe', subject: 'Assignment Feedback', message: 'Great work on the last assignment! Keep it up.', date: '2026-01-06', read: false }
  ]

  db.data.students = [
    { id: 'STU001', name: 'John Doe', email: 'john.doe@school.com', enrollmentYear: 2023, gpa: 3.8, status: 'Active' },
    { id: 'STU002', name: 'Jane Smith', email: 'jane.smith@school.com', enrollmentYear: 2023, gpa: 3.9, status: 'Active' },
    { id: 'STU003', name: 'Mike Johnson', email: 'mike.johnson@school.com', enrollmentYear: 2024, gpa: 3.6, status: 'Active' }
  ]

  db.data._initialized = true
  await db.write()
}

// ============ AUTH ROUTES ============
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  await db.read()

  // Admin login - Akupan Desmond Ekwen
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const adminProfile = {
      id: 'ADMIN001',
      name: 'Akupan Desmond Ekwen',
      email: ADMIN_CREDENTIALS.email,
      whatsapp: ADMIN_CREDENTIALS.whatsapp,
      role: 'admin',
      position: 'School Administrator',
      department: 'Administration',
      joinDate: '2020-01-15'
    }
    const token = 'admin_token_' + nanoid()
    res.json({ success: true, profile: adminProfile, role: 'admin', token })
  }
  // Student login (demo account)
  else if (email === 'john.doe@school.com' && password === 'student123') {
    const studentProfile = {
      ...db.data.profile,
      role: 'student'
    }
    const token = 'student_token_' + nanoid()
    res.json({ success: true, profile: studentProfile, role: 'student', token })
  }
  else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

// ============ STUDENT ROUTES ============
app.get('/api/profile', async (req, res) => {
  await db.read()
  res.json(db.data.profile)
})

app.get('/api/courses', async (req, res) => {
  await db.read()
  res.json(db.data.availableCourses)
})

app.get('/api/registered', async (req, res) => {
  await db.read()
  res.json(db.data.registeredCourses)
})

app.post('/api/register', async (req, res) => {
  const { courseId } = req.body
  await db.read()
  const course = db.data.availableCourses.find(c => c.id === courseId)
  if (!course) return res.status(404).json({ error: 'Course not found' })
  const already = db.data.registeredCourses.find(c => c.id === courseId)
  if (already) return res.status(400).json({ error: 'Already registered' })
  if (course.enrolled >= course.capacity) return res.status(400).json({ error: 'Course full' })

  const reg = { ...course, location: 'TBD', registrationDate: new Date().toISOString().slice(0, 10) }
  db.data.registeredCourses.push(reg)
  course.enrolled += 1
  await db.write()
  res.json({ success: true, registered: reg })
})

app.post('/api/drop', async (req, res) => {
  const { courseId } = req.body
  await db.read()
  const idx = db.data.registeredCourses.findIndex(c => c.id === courseId)
  if (idx === -1) return res.status(404).json({ error: 'Not registered' })
  const course = db.data.registeredCourses.splice(idx, 1)[0]
  const avail = db.data.availableCourses.find(c => c.id === courseId)
  if (avail) avail.enrolled = Math.max(0, avail.enrolled - 1)
  await db.write()
  res.json({ success: true })
})

app.get('/api/results', async (req, res) => {
  await db.read()
  res.json(db.data.results)
})

app.get('/api/timetable', async (req, res) => {
  await db.read()
  res.json(db.data.timetable)
})

app.get('/api/news', async (req, res) => {
  await db.read()
  res.json(db.data.news)
})

app.get('/api/announcements', async (req, res) => {
  await db.read()
  res.json(db.data.announcements)
})

app.get('/api/messages', async (req, res) => {
  await db.read()
  res.json(db.data.messages)
})

app.post('/api/messages', async (req, res) => {
  const { from, to, subject, message } = req.body
  await db.read()
  const msg = {
    id: nanoid(),
    from,
    to,
    subject,
    message,
    date: new Date().toISOString().slice(0, 10),
    read: false
  }
  db.data.messages.push(msg)
  await db.write()
  res.json({ success: true, message: msg })
})

// ============ ADMIN ROUTES ============
app.get('/api/admin/dashboard', async (req, res) => {
  await db.read()
  res.json({
    totalStudents: db.data.students?.length || 150,
    totalCourses: db.data.availableCourses.length,
    totalRegistrations: db.data.registeredCourses.length,
    averageGPA: 3.7,
    recentActivity: [
      { date: '2026-01-07', activity: 'New student registration', details: '5 students registered' },
      { date: '2026-01-06', activity: 'Course updated', details: 'CS101 enrollment increased' },
      { date: '2026-01-05', activity: 'Announcement posted', details: 'Exam schedule released' }
    ]
  })
})

app.get('/api/admin/students', async (req, res) => {
  await db.read()
  res.json(db.data.students || [])
})

app.post('/api/admin/students', async (req, res) => {
  const { name, email, enrollmentYear } = req.body
  await db.read()
  const student = {
    id: 'STU' + (db.data.students?.length + 1 || 1).toString().padStart(3, '0'),
    name,
    email,
    enrollmentYear,
    gpa: 0,
    status: 'Active'
  }
  db.data.students.push(student)
  await db.write()
  res.json({ success: true, student })
})

app.get('/api/admin/courses', async (req, res) => {
  await db.read()
  res.json(db.data.availableCourses.map(c => ({
    ...c,
    totalEnrolled: c.enrolled,
    waitlist: Math.max(0, c.enrolled - c.capacity)
  })))
})

app.post('/api/admin/courses', async (req, res) => {
  const { code, name, instructor, credits, schedule, capacity, description } = req.body
  await db.read()
  const course = {
    id: code,
    code,
    name,
    instructor,
    credits,
    schedule,
    capacity,
    enrolled: 0,
    description
  }
  db.data.availableCourses.push(course)
  await db.write()
  res.json({ success: true, course })
})

app.put('/api/admin/courses/:courseId', async (req, res) => {
  const { courseId } = req.params
  const { code, name, instructor, credits, schedule, capacity, description } = req.body
  await db.read()
  const course = db.data.availableCourses.find(c => c.id === courseId)
  if (!course) return res.status(404).json({ error: 'Course not found' })
  Object.assign(course, { code, name, instructor, credits, schedule, capacity, description })
  await db.write()
  res.json({ success: true, course })
})

app.delete('/api/admin/courses/:courseId', async (req, res) => {
  const { courseId } = req.params
  await db.read()
  db.data.availableCourses = db.data.availableCourses.filter(c => c.id !== courseId)
  await db.write()
  res.json({ success: true })
})

app.post('/api/admin/announcements', async (req, res) => {
  const { title, message, priority } = req.body
  await db.read()
  const announcement = {
    id: nanoid(),
    title,
    date: new Date().toISOString().slice(0, 10),
    message,
    priority: priority || 'normal'
  }
  db.data.announcements.push(announcement)
  await db.write()
  res.json({ success: true, announcement })
})

app.get('/api/admin/news', async (req, res) => {
  await db.read()
  res.json(db.data.news)
})

app.post('/api/admin/news', async (req, res) => {
  const { title, content } = req.body
  await db.read()
  const newsItem = {
    id: nanoid(),
    title,
    date: new Date().toISOString().slice(0, 10),
    content
  }
  db.data.news.push(newsItem)
  await db.write()
  res.json({ success: true, news: newsItem })
})

app.listen(4000, () => {
  console.log('\n=== School Portal API ===')
  console.log('Running on http://localhost:4000')
  console.log('\n📧 ADMIN Credentials:')
  console.log('Email: ' + ADMIN_CREDENTIALS.email)
  console.log('Password: ' + ADMIN_CREDENTIALS.password)
  console.log('WhatsApp: +237 ' + ADMIN_CREDENTIALS.whatsapp)
  console.log('\n👨‍🎓 STUDENT Demo Credentials:')
  console.log('Email: john.doe@school.com')
  console.log('Password: student123')
  console.log('\n')
})
