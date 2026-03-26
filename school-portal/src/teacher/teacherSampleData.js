// sample data for teacher module
const teacherProfiles = {
    't1': { name: 'Mr. John Doe', subjects: ['Math', 'Physics'], classes: ['10A', '12B'], events: ['School Assembly - Mon', 'Science Fair - Fri'] },
    't2': { name: 'Ms. Jane Smith', subjects: ['English', 'History'], classes: ['9C', '11D'], events: ['Art Exhibition - Wed'] },
};

// students list for marking etc
const studentList = {
    '10A': [
        { id: 's1', name: 'Student One' },
        { id: 's2', name: 'Student Two' },
    ],
    '12B': [
        { id: 's3', name: 'Student Three' },
        { id: 's4', name: 'Student Four' },
    ],
    '9C': [ { id: 's5', name: 'Student Five' } ],
    '11D': [ { id: 's6', name: 'Student Six' } ],
};

// attendance records
const attendanceRecords = {}; // keys by class and date

// marks database
const marksData = {}; // keys by student id

// timetable
const timetableData = {
    't1': [
        { day: 'Monday', period: '1', subject: 'Math', class: '10A' },
        { day: 'Monday', period: '2', subject: 'Physics', class: '12B' },
        // ...
    ],
    't2': [
        { day: 'Monday', period: '1', subject: 'English', class: '9C' },
    ],
};

export { teacherProfiles, studentList, attendanceRecords, marksData, timetableData };