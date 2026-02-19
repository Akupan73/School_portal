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
db.data.sessions ||= []
db.data.assignments ||= []
db.data.grades ||= []
db.data.attendance ||= []
db.data.parents ||= []
db.data.recommendations ||= []
db.data.parentRegistrations ||= []

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

    // Applications submitted by prospective students (pending approval)
    db.data.applications = [
      // sample
      // { id: nanoid(), name: 'Alice Applicant', email: 'alice@example.com', phone: '600000000', year: 2026, status: 'pending', submittedAt: '2026-01-06' }
    ]

    // Resources (library, course materials)
    db.data.resources = [
      { id: nanoid(), title: 'Intro to Programming - PDF', type: 'ebook', url: 'https://example.com/intro-programming.pdf', uploadedBy: 'Library', date: '2026-01-03' }
    ]

  db.data.students = [
    { id: 'STU001', name: 'John Doe', email: 'john.doe@school.com', enrollmentYear: 2023, gpa: 3.8, status: 'Active' },
    { id: 'STU002', name: 'Jane Smith', email: 'jane.smith@school.com', enrollmentYear: 2023, gpa: 3.9, status: 'Active' },
    { id: 'STU003', name: 'Mike Johnson', email: 'mike.johnson@school.com', enrollmentYear: 2024, gpa: 3.6, status: 'Active' }
  ]

  // Sample parents for testing
  db.data.parents = [
    { id: 'PAR001', parentNumber: 'PAR001', parentName: 'John Smith', email: 'john.smith@email.com', phone: '+237123456789', childrenNames: 'John Doe', status: 'approved', createdAt: '2026-01-01' },
    { id: 'PAR002', parentNumber: 'PAR002', parentName: 'Mary Johnson', email: 'mary.j@email.com', phone: '+237987654321', childrenNames: 'Jane Smith', status: 'approved', createdAt: '2026-01-02' },
    { id: 'PAR003', parentNumber: 'PAR003', parentName: 'David Wilson', email: 'david.w@email.com', phone: '+237555666777', childrenNames: 'Mike Johnson', status: 'approved', createdAt: '2026-01-03' }
  ]

  db.data._initialized = true
  await db.write()
}

// ============ AUTH ROUTES ============
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  await db.read()

  // helper to create session
  const createSession = (role, profileEmail) => {
    const token = role + '_token_' + nanoid()
    db.data.sessions.push({ token, role, email: profileEmail, createdAt: new Date().toISOString() })
    db.write()
    return token
  }

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
    const token = createSession('admin', ADMIN_CREDENTIALS.email)
    res.json({ success: true, profile: adminProfile, role: 'admin', token })
    return
  }

  // Student login (demo account)
  if (email === 'john.doe@school.com' && password === 'student123') {
    const studentProfile = {
      ...db.data.profile,
      role: 'student'
    }
    const token = createSession('student', studentProfile.email)
    res.json({ success: true, profile: studentProfile, role: 'student', token })
    return
  }

  // Demo faculty account
  if (email === 'prof.jones@school.com' && password === 'faculty123') {
    const facultyProfile = { id: 'FAC001', name: 'Prof. Jones', email: 'prof.jones@school.com', role: 'faculty', department: 'Computer Science' }
    const token = createSession('faculty', facultyProfile.email)
    res.json({ success: true, profile: facultyProfile, role: 'faculty', token })
    return
  }

  res.status(401).json({ error: 'Invalid credentials' })
})

// ============ PARENT LOGIN ROUTES ============
app.post('/api/parent/login', async (req, res) => {
  const { parentNumber } = req.body
  await db.read()

  const parent = db.data.parents.find(p => p.parentNumber === parentNumber && p.status === 'approved')
  
  if (!parent) {
    return res.status(401).json({ success: false, message: 'Parent number not found or not approved' })
  }

  const token = 'parent_token_' + nanoid()
  db.data.sessions.push({ token, role: 'parent', email: parent.email, parentNumber: parentNumber, createdAt: new Date().toISOString() })
  await db.write()

  res.json({
    success: true,
    parent: {
      id: parent.id,
      parentNumber: parent.parentNumber,
      parentName: parent.parentName,
      email: parent.email,
      phone: parent.phone,
      childrenNames: parent.childrenNames
    },
    token
  })
})

// Submit recommendation for app
app.post('/api/parent/recommend', async (req, res) => {
  const { parentNumber, schoolName, message, timestamp } = req.body
  await db.read()

  const recommendation = {
    id: nanoid(),
    parentNumber,
    schoolName,
    message,
    status: 'pending',
    timestamp: timestamp || new Date().toISOString(),
    createdAt: new Date().toISOString()
  }

  db.data.recommendations.push(recommendation)
  await db.write()

  res.json({ success: true, recommendation })
})

// Register as new parent
app.post('/api/parent/register', async (req, res) => {
  const { parentNumber, parentName, email, phone, childrenNames, timestamp } = req.body
  await db.read()

  const registration = {
    id: nanoid(),
    parentNumber,
    parentName,
    email,
    phone,
    childrenNames,
    status: 'pending',
    timestamp: timestamp || new Date().toISOString(),
    createdAt: new Date().toISOString()
  }

  db.data.parentRegistrations.push(registration)
  await db.write()

  res.json({ success: true, registration })
})

// Get parent children
app.get('/api/parent/children', authenticate, async (req, res) => {
  await db.read()
  // Return mock children data - in a real app, this would be from a relational database
  const children = [
    { id: 'STU001', name: 'John Doe', studentId: 'STU001', grade: '10A', courses: ['CS101', 'MATH201'] },
    { id: 'STU002', name: 'Jane Doe', studentId: 'STU002', grade: '9B', courses: ['ENG150', 'PHYS150'] }
  ]
  res.json({ success: true, children })
})

// ============ AUTH MIDDLEWARE ============
function authenticate(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : (req.query.token || null)
  if (!token) return res.status(401).json({ error: 'Missing token' })
  const session = db.data.sessions.find(s => s.token === token)
  if (!session) return res.status(401).json({ error: 'Invalid token' })
  req.session = session
  next()
}

function requireRole(role) {
  return (req, res, next) => {
    const auth = req.headers.authorization || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : (req.query.token || null)
    if (!token) return res.status(401).json({ error: 'Missing token' })
    const session = db.data.sessions.find(s => s.token === token)
    if (!session) return res.status(401).json({ error: 'Invalid token' })
    if (session.role !== role) return res.status(403).json({ error: 'Forbidden' })
    req.session = session
    next()
  }
}

// protect admin routes
app.use('/api/admin', requireRole('admin'))

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

// unread count for the authenticated user (admin/student/faculty)
app.get('/api/messages/unread-count', authenticate, async (req, res) => {
  await db.read()
  const target = req.session.role === 'admin' ? 'Admin' : req.session.email
  const count = db.data.messages.filter(m => m.to === target && !m.read).length
  res.json({ count })
})

// ============ ASSIGNMENTS (student submit, faculty view) ============
app.post('/api/assignments', authenticate, async (req, res) => {
  const { courseCode, title, content, url } = req.body
  await db.read()
  const submission = {
    id: nanoid(),
    studentEmail: req.session.email,
    courseCode,
    title,
    content: content || '',
    url: url || '',
    submittedAt: new Date().toISOString().slice(0,10),
    graded: false
  }
  db.data.assignments.push(submission)
  await db.write()
  res.json({ success: true, submission })
})

app.get('/api/assignments', authenticate, async (req, res) => {
  await db.read()
  if (req.session.role === 'faculty') {
    res.json(db.data.assignments)
  } else {
    const mine = db.data.assignments.filter(a => a.studentEmail === req.session.email)
    res.json(mine)
  }
})

// ============ FACULTY: GRADES & ATTENDANCE ============
app.post('/api/faculty/grades', requireRole('faculty'), async (req, res) => {
  const { studentId, courseCode, grade, remarks } = req.body
  await db.read()
  const record = { id: nanoid(), studentId, courseCode, grade, remarks, grader: req.session.email, date: new Date().toISOString().slice(0,10) }
  db.data.grades.push(record)
  await db.write()
  res.json({ success: true, record })
})

app.get('/api/faculty/grades', requireRole('faculty'), async (req, res) => {
  await db.read()
  const { course } = req.query
  if (course) res.json(db.data.grades.filter(g => g.courseCode === course))
  else res.json(db.data.grades)
})

app.post('/api/faculty/attendance', requireRole('faculty'), async (req, res) => {
  const { courseCode, studentId, date, present } = req.body
  await db.read()
  const rec = { id: nanoid(), courseCode, studentId, date: date || new Date().toISOString().slice(0,10), present: !!present, recordedBy: req.session.email }
  db.data.attendance.push(rec)
  await db.write()
  res.json({ success: true, rec })
})

app.get('/api/faculty/attendance', requireRole('faculty'), async (req, res) => {
  await db.read()
  const { course } = req.query
  if (course) res.json(db.data.attendance.filter(a => a.courseCode === course))
  else res.json(db.data.attendance)
})

// ============ APPLICATIONS & RESOURCES ============
// Student/Prospective student applies/registers
app.post('/api/apply', async (req, res) => {
  const { name, email, phone, enrollmentYear } = req.body
  await db.read()
  const application = {
    id: nanoid(),
    name,
    email,
    phone,
    enrollmentYear,
    status: 'pending',
    submittedAt: new Date().toISOString().slice(0, 10)
  }
  db.data.applications.push(application)
  await db.write()
  // notify admin via messages
  db.data.messages.push({ id: nanoid(), from: application.name, to: 'Admin', subject: 'New Application', message: `New application from ${application.name} (${application.email})`, date: new Date().toISOString().slice(0,10), read: false })
  await db.write()
  res.json({ success: true, application })
})

// List applications (admin)
app.get('/api/applications', async (req, res) => {
  await db.read()
  res.json(db.data.applications || [])
})

// Admin approves application -> creates student record and marks application approved
app.post('/api/admin/applications/:id/approve', async (req, res) => {
  const { id } = req.params
  await db.read()
  const appIdx = db.data.applications.findIndex(a => a.id === id)
  if (appIdx === -1) return res.status(404).json({ error: 'Application not found' })
  const application = db.data.applications[appIdx]
  application.status = 'approved'
  application.processedAt = new Date().toISOString().slice(0,10)

  // create student
  const student = {
    id: 'STU' + (db.data.students?.length + 1 || 1).toString().padStart(3, '0'),
    name: application.name,
    email: application.email,
    enrollmentYear: application.enrollmentYear,
    phone: application.phone,
    gpa: 0,
    status: 'Active'
  }
  db.data.students.push(student)
  await db.write()

  // notify applicant
  db.data.messages.push({ id: nanoid(), from: 'Admin', to: application.email, subject: 'Application Approved', message: `Dear ${application.name}, your application has been approved. Your student ID is ${student.id}.`, date: new Date().toISOString().slice(0,10), read: false })
  await db.write()

  res.json({ success: true, student, application })
})

app.post('/api/admin/applications/:id/reject', async (req, res) => {
  const { id } = req.params
  const { reason } = req.body
  await db.read()
  const appIdx = db.data.applications.findIndex(a => a.id === id)
  if (appIdx === -1) return res.status(404).json({ error: 'Application not found' })
  const application = db.data.applications[appIdx]
  application.status = 'rejected'
  application.processedAt = new Date().toISOString().slice(0,10)
  application.rejectionReason = reason || ''
  await db.write()
  db.data.messages.push({ id: nanoid(), from: 'Admin', to: application.email, subject: 'Application Rejected', message: `Dear ${application.name}, your application was rejected. ${reason || ''}`, date: new Date().toISOString().slice(0,10), read: false })
  await db.write()
  res.json({ success: true, application })
})

// Resources
app.get('/api/resources', async (req, res) => {
  await db.read()
  res.json(db.data.resources || [])
})

app.post('/api/admin/resources', async (req, res) => {
  const { title, type, url } = req.body
  await db.read()
  const resource = { id: nanoid(), title, type: type || 'other', url, uploadedBy: 'Admin', date: new Date().toISOString().slice(0,10) }
  db.data.resources.push(resource)
  await db.write()
  res.json({ success: true, resource })
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

// ============ ADMIN PARENT MANAGEMENT ============
app.get('/api/admin/recommendations', async (req, res) => {
  await db.read()
  res.json({
    recommendations: db.data.recommendations || [],
    registrations: db.data.parentRegistrations || []
  })
})

app.post('/api/admin/recommendations/:id/approve', async (req, res) => {
  const { id } = req.params
  await db.read()
  
  const rec = db.data.recommendations.find(r => r.id === id)
  if (!rec) return res.status(404).json({ error: 'Recommendation not found' })
  
  rec.status = 'approved'
  rec.approvedAt = new Date().toISOString()
  
  // Automatically create parent account if not exists
  const existingParent = db.data.parents.find(p => p.parentNumber === rec.parentNumber)
  if (!existingParent) {
    db.data.parents.push({
      id: nanoid(),
      parentNumber: rec.parentNumber,
      parentName: 'Parent - ' + rec.schoolName,
      email: 'parent@' + rec.schoolName.toLowerCase().replace(/\s+/g, '') + '.com',
      phone: '+237000000000',
      childrenNames: 'TBD',
      status: 'approved',
      createdAt: new Date().toISOString()
    })
  } else {
    existingParent.status = 'approved'
  }
  
  await db.write()
  res.json({ success: true, message: 'Recommendation approved' })
})

app.post('/api/admin/recommendations/:id/reject', async (req, res) => {
  const { id } = req.params
  await db.read()
  
  const rec = db.data.recommendations.find(r => r.id === id)
  if (!rec) return res.status(404).json({ error: 'Recommendation not found' })
  
  rec.status = 'rejected'
  rec.rejectedAt = new Date().toISOString()
  
  await db.write()
  res.json({ success: true, message: 'Recommendation rejected' })
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
