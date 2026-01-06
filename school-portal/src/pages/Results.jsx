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
  Typography,
  Grid,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { mockResults } from '../data/mockData'

function getGradeColor(letterGrade) {
  if (letterGrade === 'A' || letterGrade === 'A+') return 'success'
  if (letterGrade === 'A-' || letterGrade === 'B+') return 'primary'
  if (letterGrade === 'B' || letterGrade === 'B-') return 'info'
  if (letterGrade === 'C' || letterGrade === 'C+') return 'warning'
  return 'error'
}

export default function Results() {
  const [selectedSemester] = useState('Fall 2025')
  const semesterResults = mockResults.filter(r => r.semester === selectedSemester)
  
  const overallGPA = (semesterResults.reduce((sum, r) => sum + r.gpa, 0) / semesterResults.length).toFixed(2)
  const totalCredits = semesterResults.reduce((sum, r) => sum + r.credits, 0)

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Academic Results
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="textSecondary">
          Semester: {selectedSemester}
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Overall GPA
              </Typography>
              <Typography variant="h5">{overallGPA}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Credits
              </Typography>
              <Typography variant="h5">{totalCredits}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Courses Taken
              </Typography>
              <Typography variant="h5">{semesterResults.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Grade
              </Typography>
              <Typography variant="h5">A</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        How to Check Your Results
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>1. Access Results Portal</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Log in with your student ID and password. Navigate to the "Results" section from the sidebar or dashboard. Results are typically available 2 weeks after the final exam.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>2. View Course Grades</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Click on each course to view detailed grade breakdowns including midterm, final exam, projects, and participation scores. Your overall grade and GPA contribution are also displayed.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>3. Download Transcript</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Click the "Download Transcript" button to get an official transcript PDF for applications or other purposes.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>4. Appeal Grades</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                If you believe there's an error, contact your instructor within 7 days of grade posting. Use the "Appeal" button to submit a formal request.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Course Results - {selectedSemester}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Code</strong></TableCell>
              <TableCell><strong>Course Name</strong></TableCell>
              <TableCell><strong>Instructor</strong></TableCell>
              <TableCell><strong>Credits</strong></TableCell>
              <TableCell align="center"><strong>Midterm</strong></TableCell>
              <TableCell align="center"><strong>Final</strong></TableCell>
              <TableCell align="center"><strong>Project</strong></TableCell>
              <TableCell align="center"><strong>Participation</strong></TableCell>
              <TableCell align="center"><strong>Grade</strong></TableCell>
              <TableCell align="center"><strong>GPA</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semesterResults.map(result => (
              <TableRow key={result.courseCode}>
                <TableCell>{result.courseCode}</TableCell>
                <TableCell>{result.courseName}</TableCell>
                <TableCell>{result.instructor}</TableCell>
                <TableCell>{result.credits}</TableCell>
                <TableCell align="center">{result.midterm}</TableCell>
                <TableCell align="center">{result.finalExam}</TableCell>
                <TableCell align="center">{result.projectWork}</TableCell>
                <TableCell align="center">{result.participation}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={result.letterGrade}
                    color={getGradeColor(result.letterGrade)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">{result.gpa.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
        <Typography variant="body2" color="textSecondary">
          <strong>Note:</strong> Grades are finalized 48 hours after posting. If you need clarification on any grade, please contact your instructor during office hours.
        </Typography>
      </Box>
    </div>
  )
}
