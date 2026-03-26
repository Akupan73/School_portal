// Mock data for the student portal

export const mockStudentProfile = {
  id: 'STU001',
  name: 'John Doe',
  email: 'john.doe@school.com',
  enrollmentYear: 2023,
  gpa: 3.8,
  currentSemester: 'Spring 2026'
}

export const mockAvailableCourses = [
  {
    id: 'CS101',
    code: 'CS101',
    name: 'Introduction to Computer Science',
    instructor: 'Dr. Smith',
    department: 'Computer Science',
    level: 'L100',
    credits: 3,
    schedule: 'Mon, Wed 10:00-11:30 AM',
    capacity: 30,
    enrolled: 28,
    description: 'Fundamentals of programming and algorithms',
    materials: [
      { id: 'm1', title: 'Syllabus', url: '/files/cs101-syllabus.pdf' },
      { id: 'm2', title: 'Lecture 1 slides', url: '/files/cs101-lecture1.pdf' }
    ],
    assignments: [
      { id: 'a1', title: 'Homework 1', due: '2026-03-15' },
      { id: 'a2', title: 'Project proposal', due: '2026-04-01' }
    ],
    grades: [
      { studentId: 'STU001', grade: 'A-', remarks: 'Good work' }
    ],
    announcements: [
      { id: 'ann1', message: 'Midterm next week', date: '2026-03-10' }
    ],
    resources: [
      { id: 'r1', title: 'Companion textbook', url: 'https://example.com/textbook' }
    ],
    discussion: [],
    quizzes: [
      { id: 'q1', title: 'Quiz 1', questions: [
          { id: 'q1a1', text: 'What is 2+2?', options: ['3','4','5'], answer: '4' },
          { id: 'q1a2', text: 'Select prime numbers', options: ['2','4','9'], multiple: true, answer: ['2'] }
        ]
      }
    ]
  },
  {
    id: 'MATH201',
    code: 'MATH201',
    name: 'Calculus II',
    instructor: 'Prof. Johnson',
    department: 'Mathematics',
    level: 'L200',
    credits: 4,
    schedule: 'Tue, Thu 2:00-3:30 PM',
    capacity: 25,
    enrolled: 24,
    description: 'Advanced calculus concepts',
    materials: [],
    assignments: [],
    grades: [],
    announcements: [],
    resources: [],
    discussion: []
  },
  {
    id: 'ENG150',
    code: 'ENG150',
    name: 'English Literature',
    instructor: 'Dr. Williams',
    teacherContact: 'williams@school.com',
    department: 'Business & Management',
    level: 'L300',
    credits: 3,
    schedule: 'Mon, Wed, Fri 1:00-1:50 PM',
    capacity: 35,
    enrolled: 32,
    description: 'British and American literature',
    materials: [],
    assignments: [],
    grades: [],
    announcements: [],
    resources: [],
    discussion: []
  },
  {
    id: 'PHYS150',
    code: 'PHYS150',
    name: 'Physics I',
    instructor: 'Dr. Brown',
    teacherContact: 'brown@school.com',
    department: 'Civil Engineering',
    level: 'L200',
    credits: 4,
    schedule: 'Tue, Thu 10:00-11:30 AM',
    capacity: 20,
    enrolled: 18,
    description: 'Mechanics and thermodynamics',
    materials: [],
    assignments: [],
    grades: [],
    announcements: [],
    resources: [],
    discussion: []
  },
  {
    id: 'CHEM101',
    code: 'CHEM101',
    name: 'Chemistry Fundamentals',
    instructor: 'Prof. Davis',
    teacherContact: 'davis@school.com',
    department: 'Chemistry',
    level: 'Undergraduate',
    credits: 3,
    schedule: 'Mon, Wed 2:00-3:30 PM',
    capacity: 30,
    enrolled: 25,
    description: 'Basic chemistry principles',
    materials: [],
    assignments: [],
    grades: [],
    announcements: [],
    resources: [],
    discussion: []
  },
  {
    id: 'HIST101',
    code: 'HIST101',
    name: 'World History',
    instructor: 'Dr. Miller',
    credits: 3,
    schedule: 'Fri 1:00-3:50 PM',
    capacity: 40,
    enrolled: 38,
    description: 'From ancient times to present'
  }
]

export const mockRegisteredCourses = [
  {
    id: 'CS101',
    code: 'CS101',
    name: 'Introduction to Computer Science',
    instructor: 'Dr. Smith',
    credits: 3,
    schedule: 'Mon, Wed 10:00-11:30 AM',
    location: 'Building A, Room 201',
    registrationDate: '2025-12-15'
  },
  {
    id: 'MATH201',
    code: 'MATH201',
    name: 'Calculus II',
    instructor: 'Prof. Johnson',
    credits: 4,
    schedule: 'Tue, Thu 2:00-3:30 PM',
    location: 'Building B, Room 105',
    registrationDate: '2025-12-15'
  },
  {
    id: 'ENG150',
    code: 'ENG150',
    name: 'English Literature',
    instructor: 'Dr. Williams',
    credits: 3,
    schedule: 'Mon, Wed, Fri 1:00-1:50 PM',
    location: 'Building C, Room 312',
    registrationDate: '2025-12-20'
  }
]

export const mockResults = [
  {
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    instructor: 'Dr. Smith',
    credits: 3,
    semester: 'Fall 2025',
    midterm: 88,
    finalExam: 92,
    projectWork: 95,
    participation: 90,
    gradePoints: 4.0,
    letterGrade: 'A',
    gpa: 4.0
  },
  {
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    instructor: 'Prof. Johnson',
    credits: 4,
    semester: 'Fall 2025',
    midterm: 85,
    finalExam: 88,
    projectWork: 87,
    participation: 86,
    gradePoints: 3.8,
    letterGrade: 'A-',
    gpa: 3.8
  },
  {
    courseCode: 'ENG150',
    courseName: 'English Literature',
    instructor: 'Dr. Williams',
    credits: 3,
    semester: 'Fall 2025',
    midterm: 92,
    finalExam: 90,
    projectWork: 91,
    participation: 92,
    gradePoints: 4.0,
    letterGrade: 'A',
    gpa: 4.0
  },
  {
    courseCode: 'PHYS150',
    courseName: 'Physics I',
    instructor: 'Dr. Brown',
    credits: 4,
    semester: 'Fall 2025',
    midterm: 78,
    finalExam: 82,
    projectWork: 85,
    participation: 80,
    gradePoints: 3.5,
    letterGrade: 'B+',
    gpa: 3.5
  }
]

export const mockTimetable = [
  { day: 'Monday', time: '10:00-11:30 AM', course: 'CS101', room: 'A-201', instructor: 'Dr. Smith' },
  { day: 'Monday', time: '1:00-1:50 PM', course: 'ENG150', room: 'C-312', instructor: 'Dr. Williams' },
  { day: 'Monday', time: '2:00-3:30 PM', course: 'CHEM101', room: 'B-150', instructor: 'Prof. Davis' },
  { day: 'Tuesday', time: '10:00-11:30 AM', course: 'PHYS150', room: 'A-305', instructor: 'Dr. Brown' },
  { day: 'Tuesday', time: '2:00-3:30 PM', course: 'MATH201', room: 'B-105', instructor: 'Prof. Johnson' },
  { day: 'Wednesday', time: '10:00-11:30 AM', course: 'CS101', room: 'A-201', instructor: 'Dr. Smith' },
  { day: 'Wednesday', time: '1:00-1:50 PM', course: 'ENG150', room: 'C-312', instructor: 'Dr. Williams' },
  { day: 'Wednesday', time: '2:00-3:30 PM', course: 'CHEM101', room: 'B-150', instructor: 'Prof. Davis' },
  { day: 'Thursday', time: '10:00-11:30 AM', course: 'PHYS150', room: 'A-305', instructor: 'Dr. Brown' },
  { day: 'Thursday', time: '2:00-3:30 PM', course: 'MATH201', room: 'B-105', instructor: 'Prof. Johnson' },
  { day: 'Friday', time: '1:00-1:50 PM', course: 'ENG150', room: 'C-312', instructor: 'Dr. Williams' }
]

export const mockNotifications = [
  { id: 1, type: 'assignment', message: 'Homework 3 due tomorrow', date: '2026-03-05' },
  { id: 2, type: 'exam', message: 'Midterm exam scheduled for 2026-03-15', date: '2026-03-15' },
  { id: 3, type: 'meeting', message: 'Parent-teacher meeting on 2026-03-20', date: '2026-03-20' }
]

export const mockCalendarEvents = [
  { id: 1, date: '2026-03-10', title: 'Spring Break Begins' },
  { id: 2, date: '2026-04-01', title: 'Project Submission Deadline' },
  { id: 3, date: '2026-05-05', title: 'Final Exams Week' }
]

export const mockAttendanceRecord = {
  percentage: 92,
  total: 120,
  present: 110,
  absent: 10
}
