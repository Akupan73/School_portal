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
  Paper,
  Button
} from '@mui/material'
import { getAdminFees } from '../api'

// simple mock data
const mockFees = [
  { studentId: 'STU001', name: 'John Doe', status: 'Paid', amount: 1200 },
  { studentId: 'STU002', name: 'Jane Smith', status: 'Due', amount: 1500 },
  { studentId: 'STU003', name: 'Robert Brown', status: 'Paid', amount: 1200 }
]

export default function AdminFees() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    // TODO: replace with API call
    setRecords(mockFees)
  }, [])

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Fee Management</Typography>
      </Box>
      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Amount</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map(r => (
                  <TableRow key={r.studentId} hover>
                    <TableCell>{r.studentId}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.status}</TableCell>
                    <TableCell>${r.amount}</TableCell>
                    <TableCell>
                      {r.status === 'Due' && <Button size="small" variant="outlined">Generate Invoice</Button>}
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
