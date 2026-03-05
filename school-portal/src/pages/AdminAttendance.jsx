import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { getAdminAttendance } from '../api'

// placeholder mock data
const mockAttendance = [
  { studentId: 'STU001', name: 'John Doe', percentage: 95 },
  { studentId: 'STU002', name: 'Jane Smith', percentage: 88 },
  { studentId: 'STU003', name: 'Robert Brown', percentage: 92 }
]

export default function AdminAttendance() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    // TODO: fetch from API /api/admin/attendance
    setRecords(mockAttendance)
  }, [])

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Attendance Reports</Typography>
      </Box>
      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Attendance %</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map(r => (
                  <TableRow key={r.studentId} hover>
                    <TableCell>{r.studentId}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.percentage}%</TableCell>
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
