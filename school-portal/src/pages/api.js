const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

async function getJson(path) {
  try {
    const token = localStorage.getItem('token')
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {}
    const res = await fetch(`${BASE}${path}`, { headers })
    if (!res.ok) throw new Error('Network response not ok')
    return await res.json()
  } catch (e) {
    console.warn('API fetch failed', path, e)
    throw e
  }
}

async function postJson(path, body) {
  try {
    const token = localStorage.getItem('token')
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error('Network response not ok')
    return await res.json()
  } catch (e) {
    console.warn('API POST failed', path, e)
    throw e
  }
}

async function putJson(path, body) {
  try {
    const token = localStorage.getItem('token')
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${BASE}${path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error('Network response not ok')
    return await res.json()
  } catch (e) {
    console.warn('API PUT failed', path, e)
    throw e
  }
}

async function deleteJson(path) {
  try {
    const token = localStorage.getItem('token')
    const headers = {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${BASE}${path}`, { method: 'DELETE', headers })
    if (!res.ok) throw new Error('Network response not ok')
    return await res.json()
  } catch (e) {
    console.warn('API DELETE failed', path, e)
    throw e
  }
}

// ===== STUDENT APIs =====
export async function getProfile() { return getJson('/api/profile') }
export async function getCourses() { return getJson('/api/courses') }
export async function getRegistered() { return getJson('/api/registered') }
export async function registerCourse(courseId) { return postJson('/api/register', { courseId }) }
export async function dropCourse(courseId) { return postJson('/api/drop', { courseId }) }
export async function getResults() { return getJson('/api/results') }
export async function getTimetable() { return getJson('/api/timetable') }
export async function getNews() { return getJson('/api/news') }
export async function getAnnouncements() { return getJson('/api/announcements') }
export async function getMessages() { return getJson('/api/messages') }
export async function sendMessage(from, to, subject, message) { return postJson('/api/messages', { from, to, subject, message }) }

// ===== AUTH =====
export async function login(body) { return postJson('/api/login', body) }

// ===== ADMIN APIs =====
export async function getAdminDashboard() { return getJson('/api/admin/dashboard') }
export async function getAdminStudents() { return getJson('/api/admin/students') }
export async function addStudent(name, email, enrollmentYear) { return postJson('/api/admin/students', { name, email, enrollmentYear }) }
export async function getAdminCourses() { return getJson('/api/admin/courses') }
export async function addCourse(code, name, instructor, credits, schedule, capacity, description) { 
  return postJson('/api/admin/courses', { code, name, instructor, credits, schedule, capacity, description }) 
}
export async function updateCourse(courseId, data) { return putJson(`/api/admin/courses/${courseId}`, data) }
export async function deleteCourse(courseId) { return deleteJson(`/api/admin/courses/${courseId}`) }
export async function postAnnouncement(title, message, priority) { return postJson('/api/admin/announcements', { title, message, priority }) }
export async function getAdminNews() { return getJson('/api/admin/news') }
export async function postNews(title, content) { return postJson('/api/admin/news', { title, content }) }

// ===== APPLICATIONS & RESOURCES =====
export async function postApplication(name, email, phone, enrollmentYear) {
  return postJson('/api/apply', { name, email, phone, enrollmentYear })
}
export async function getApplications() { return getJson('/api/applications') }
export async function approveApplication(applicationId) { return postJson(`/api/admin/applications/${applicationId}/approve`, {}) }
export async function rejectApplication(applicationId, reason) { return postJson(`/api/admin/applications/${applicationId}/reject`, { reason }) }

export async function getResources() { return getJson('/api/resources') }
export async function postResource(title, url, description) { return postJson('/api/admin/resources', { title, url, description }) }
export async function getUnreadCount() { return getJson('/api/messages/unread-count') }

export async function markMessageRead(id) { return postJson(`/api/messages/${id}/read`, {}) }
export async function markAllRead() { return postJson('/api/messages/mark-all-read', {}) }

// ===== ASSIGNMENTS =====
export async function submitAssignment(courseCode, title, content, url) { return postJson('/api/assignments', { courseCode, title, content, url }) }
export async function getAssignments() { return getJson('/api/assignments') }

// ===== FACULTY =====
export async function postGrade(studentId, courseCode, grade, remarks) { return postJson('/api/faculty/grades', { studentId, courseCode, grade, remarks }) }
export async function getGrades(course) { return getJson(`/api/faculty/grades${course ? '?course=' + encodeURIComponent(course) : ''}`) }
export async function postAttendance(courseCode, studentId, date, present) { return postJson('/api/faculty/attendance', { courseCode, studentId, date, present }) }
export async function getAttendance(course) { return getJson(`/api/faculty/attendance${course ? '?course=' + encodeURIComponent(course) : ''}`) }


