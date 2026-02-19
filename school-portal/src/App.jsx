import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AdminSidebar from './components/AdminSidebar'
import FacultySidebar from './components/FacultySidebar'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import CourseRegistration from './pages/CourseRegistration'
import Results from './pages/Results'
import Timetable from './pages/Timetable'
import NewsAnnouncements from './pages/NewsAnnouncements'
import Messaging from './pages/Messaging'
import Resources from './pages/Resources'
import Assignments from './pages/Assignments'
import AdminDashboard from './pages/AdminDashboard'
import AdminStudents from './pages/AdminStudents'
import AdminCourses from './pages/AdminCourses'
import AdminNews from './pages/AdminNews'
import AdminApplications from './pages/AdminApplications'
import AdminResources from './pages/AdminResources'
import FacultyCourses from './pages/FacultyCourses'
import FacultyGrades from './pages/FacultyGrades'
import FacultyAttendance from './pages/FacultyAttendance'
import PaymentModule from './payment/PaymentModule'
import PaymentDetail from './payment/PaymentDetail'
import ParentDashboard from './parent/ParentDashboard'
import SchoolRegistration from './pages/SchoolRegistration'
// Parent login uses the main parent dashboard under /parent

export default function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || null)

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const isAdmin = role === 'admin'
  const isFaculty = role === 'faculty'

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      {isAdmin ? <AdminSidebar /> : isFaculty ? <FacultySidebar /> : <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Routes>
          <Route path="/" element={<Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />} />
          {/* Student routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<ProtectedRoute><CourseRegistration /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/timetable" element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
          <Route path="/news" element={<NewsAnnouncements />} />
          <Route path="/messages" element={<ProtectedRoute><Messaging /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
          <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute requiredRole="admin"><AdminStudents /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute requiredRole="admin"><AdminCourses /></ProtectedRoute>} />
          <Route path="/admin/announcements" element={<ProtectedRoute requiredRole="admin"><AdminNews /></ProtectedRoute>} />
          <Route path="/admin/news" element={<ProtectedRoute requiredRole="admin"><AdminNews /></ProtectedRoute>} />
          <Route path="/admin/applications" element={<ProtectedRoute requiredRole="admin"><AdminApplications /></ProtectedRoute>} />
          <Route path="/admin/resources" element={<ProtectedRoute requiredRole="admin"><AdminResources /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />

          {/* Faculty routes */}
          <Route path="/faculty/courses" element={<ProtectedRoute requiredRole="faculty"><FacultyCourses /></ProtectedRoute>} />
          <Route path="/faculty/grades" element={<ProtectedRoute requiredRole="faculty"><FacultyGrades /></ProtectedRoute>} />
          <Route path="/faculty/attendance" element={<ProtectedRoute requiredRole="faculty"><FacultyAttendance /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentModule /></ProtectedRoute>} />
          <Route path="/payment/:id" element={<ProtectedRoute><PaymentDetail /></ProtectedRoute>} />
          
          {/* Parent routes */}
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/school/register" element={<SchoolRegistration />} />
        </Routes>
      </Box>
    </Box>
  )
}
