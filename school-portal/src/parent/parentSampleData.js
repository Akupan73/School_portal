// Sample parent data with phone numbers and their children
const parentData = {
    '+1-555-0001': {
        name: 'John Smith',
        email: 'john.smith@email.com',
        address: '123 Main Street, New York, NY 10001',
        children: [
            { id: 'c1', name: 'Alice Smith', class: '10A', rollNo: '001', section: 'A' },
            { id: 'c2', name: 'Bob Smith', class: '8B', rollNo: '015', section: 'B' },
        ]
    },
    '+1-555-0002': {
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        address: '456 Oak Avenue, Los Angeles, CA 90001',
        children: [
            { id: 'c3', name: 'Carlos Garcia', class: '9C', rollNo: '032', section: 'C' },
            { id: 'c6', name: 'Isabella Garcia', class: '7A', rollNo: '048', section: 'A' },
        ]
    },
    '+44-20-1234-5678': {
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        address: '789 Park Lane, London, UK SW1A 1AA',
        children: [
            { id: 'c4', name: 'David Wilson', class: '11A', rollNo: '005', section: 'A' },
            { id: 'c5', name: 'Sophie Wilson', class: '9D', rollNo: '022', section: 'D' },
        ]
    },
    '+91-9876543210': {
        name: 'Rajesh Patel',
        email: 'rajesh.patel@email.com',
        address: '321 Maple Road, Mumbai, Maharashtra 400001',
        children: [
            { id: 'c7', name: 'Arjun Patel', class: '12A', rollNo: '008', section: 'A' },
            { id: 'c8', name: 'Priya Patel', class: '10C', rollNo: '035', section: 'C' },
            { id: 'c9', name: 'Rahul Patel', class: '8A', rollNo: '018', section: 'A' },
        ]
    },
    '+86-10-1234-5678': {
        name: 'Li Wei',
        email: 'li.wei@email.com',
        address: '555 Dragon Street, Beijing, China 100000',
        children: [
            { id: 'c10', name: 'Li Ming', class: '11B', rollNo: '012', section: 'B' },
        ]
    },
    '+81-3-1234-5678': {
        name: 'Yuki Tanaka',
        email: 'yuki.tanaka@email.com',
        address: '999 Cherry Blossom Lane, Tokyo, Japan 100-0001',
        children: [
            { id: 'c11', name: 'Sakura Tanaka', class: '9B', rollNo: '028', section: 'B' },
            { id: 'c12', name: 'Hiroshi Tanaka', class: '10D', rollNo: '041', section: 'D' },
        ]
    },
};

// Sample results data
const resultsData = {
    'c1': { name: 'Alice Smith', math: 85, english: 92, science: 88, hindi: 90, overall: 88.75, grade: 'A' },
    'c2': { name: 'Bob Smith', math: 78, english: 80, science: 82, hindi: 79, overall: 79.75, grade: 'B' },
    'c3': { name: 'Carlos Garcia', math: 90, english: 87, science: 91, hindi: 88, overall: 89, grade: 'A' },
    'c4': { name: 'David Wilson', math: 95, english: 93, science: 94, hindi: 92, overall: 93.5, grade: 'A+' },
    'c5': { name: 'Sophie Wilson', math: 88, english: 89, science: 87, hindi: 91, overall: 88.75, grade: 'A' },
    'c6': { name: 'Isabella Garcia', math: 82, english: 85, science: 80, hindi: 83, overall: 82.5, grade: 'B+' },
    'c7': { name: 'Arjun Patel', math: 91, english: 89, science: 93, hindi: 95, overall: 92, grade: 'A+' },
    'c8': { name: 'Priya Patel', math: 87, english: 90, science: 88, hindi: 89, overall: 88.5, grade: 'A' },
    'c9': { name: 'Rahul Patel', math: 76, english: 78, science: 75, hindi: 77, overall: 76.5, grade: 'B' },
    'c10': { name: 'Li Ming', math: 94, english: 91, science: 92, hindi: 89, overall: 91.5, grade: 'A+' },
    'c11': { name: 'Sakura Tanaka', math: 89, english: 86, science: 90, hindi: 87, overall: 88, grade: 'A' },
    'c12': { name: 'Hiroshi Tanaka', math: 92, english: 88, science: 91, hindi: 90, overall: 90.25, grade: 'A+' },
};

// Sample fee data
const feeData = {
    'c1': { childName: 'Alice Smith', totalFees: 5000, paid: 3000, outstanding: 2000, dueDate: '2026-03-15', breakdown: { tuition: 3000, transport: 1000, hostel: 1000 } },
    'c2': { childName: 'Bob Smith', totalFees: 5000, paid: 5000, outstanding: 0, dueDate: '2026-03-15', breakdown: { tuition: 3000, transport: 1000, hostel: 1000 } },
    'c3': { childName: 'Carlos Garcia', totalFees: 5000, paid: 2500, outstanding: 2500, dueDate: '2026-03-15', breakdown: { tuition: 3000, transport: 1000, hostel: 1000 } },
    'c4': { childName: 'David Wilson', totalFees: 6000, paid: 6000, outstanding: 0, dueDate: '2026-03-15', breakdown: { tuition: 3500, transport: 1200, hostel: 1300 } },
    'c5': { childName: 'Sophie Wilson', totalFees: 6000, paid: 4000, outstanding: 2000, dueDate: '2026-03-15', breakdown: { tuition: 3500, transport: 1200, hostel: 1300 } },
    'c6': { childName: 'Isabella Garcia', totalFees: 4500, paid: 4500, outstanding: 0, dueDate: '2026-03-15', breakdown: { tuition: 2700, transport: 900, hostel: 900 } },
    'c7': { childName: 'Arjun Patel', totalFees: 5500, paid: 5500, outstanding: 0, dueDate: '2026-03-15', breakdown: { tuition: 3300, transport: 1100, hostel: 1100 } },
    'c8': { childName: 'Priya Patel', totalFees: 5000, paid: 3500, outstanding: 1500, dueDate: '2026-03-15', breakdown: { tuition: 3000, transport: 1000, hostel: 1000 } },
    'c9': { childName: 'Rahul Patel', totalFees: 4500, paid: 2250, outstanding: 2250, dueDate: '2026-03-15', breakdown: { tuition: 2700, transport: 900, hostel: 900 } },
    'c10': { childName: 'Li Ming', totalFees: 6500, paid: 6500, outstanding: 0, dueDate: '2026-03-15', breakdown: { tuition: 3900, transport: 1300, hostel: 1300 } },
    'c11': { childName: 'Sakura Tanaka', totalFees: 5800, paid: 5800, outstanding: 0, dueDate: '2026-03-15', breakdown: { tuition: 3480, transport: 1160, hostel: 1160 } },
    'c12': { childName: 'Hiroshi Tanaka', totalFees: 5800, paid: 3480, outstanding: 2320, dueDate: '2026-03-15', breakdown: { tuition: 3480, transport: 1160, hostel: 1160 } },
};

// Sample attendance data
const attendanceData = {
    'c1': { childName: 'Alice Smith', present: 180, absent: 5, totalDays: 185, percentage: 97.3, leaves: 'Approved - 2 days' },
    'c2': { childName: 'Bob Smith', present: 170, absent: 15, totalDays: 185, percentage: 91.9, leaves: 'Approved - 5 days' },
    'c3': { childName: 'Carlos Garcia', present: 182, absent: 3, totalDays: 185, percentage: 98.4, leaves: 'Approved - 1 day' },
    'c4': { childName: 'David Wilson', present: 183, absent: 2, totalDays: 185, percentage: 98.9, leaves: 'None' },
    'c5': { childName: 'Sophie Wilson', present: 178, absent: 7, totalDays: 185, percentage: 96.2, leaves: 'Approved - 3 days' },
    'c6': { childName: 'Isabella Garcia', present: 179, absent: 6, totalDays: 185, percentage: 96.8, leaves: 'Approved - 2 days' },
    'c7': { childName: 'Arjun Patel', present: 184, absent: 1, totalDays: 185, percentage: 99.5, leaves: 'None' },
    'c8': { childName: 'Priya Patel', present: 181, absent: 4, totalDays: 185, percentage: 97.8, leaves: 'Approved - 1 day' },
    'c9': { childName: 'Rahul Patel', present: 165, absent: 20, totalDays: 185, percentage: 89.2, leaves: 'Approved - 8 days' },
    'c10': { childName: 'Li Ming', present: 185, absent: 0, totalDays: 185, percentage: 100, leaves: 'None' },
    'c11': { childName: 'Sakura Tanaka', present: 180, absent: 5, totalDays: 185, percentage: 97.3, leaves: 'Approved - 2 days' },
    'c12': { childName: 'Hiroshi Tanaka', present: 182, absent: 3, totalDays: 185, percentage: 98.4, leaves: 'Approved - 1 day' },
};

// Sample discipline/misconduct data
const disciplineData = {
    'c1': { childName: 'Alice Smith', incidents: [] },
    'c2': { childName: 'Bob Smith', incidents: [{ date: '2026-01-15', issue: 'Late submission', severity: 'Minor', action: 'Warning' }] },
    'c3': { childName: 'Carlos Garcia', incidents: [] },
    'c4': { childName: 'David Wilson', incidents: [{ date: '2025-12-10', issue: 'Class disruption', severity: 'Minor', action: 'Verbal Warning' }, { date: '2026-01-20', issue: 'Uniform violation', severity: 'Minor', action: 'Warning' }] },
    'c5': { childName: 'Sophie Wilson', incidents: [] },
    'c6': { childName: 'Isabella Garcia', incidents: [{ date: '2026-02-01', issue: 'Missing homework', severity: 'Minor', action: 'Parent notification' }] },
    'c7': { childName: 'Arjun Patel', incidents: [] },
    'c8': { childName: 'Priya Patel', incidents: [] },
    'c9': { childName: 'Rahul Patel', incidents: [{ date: '2026-01-10', issue: 'Fighting with classmate', severity: 'Major', action: 'Suspension - 1 day' }, { date: '2026-02-05', issue: 'Disrespect to teacher', severity: 'Major', action: 'Parent meeting' }] },
    'c10': { childName: 'Li Ming', incidents: [] },
    'c11': { childName: 'Sakura Tanaka', incidents: [] },
    'c12': { childName: 'Hiroshi Tanaka', incidents: [{ date: '2026-01-25', issue: 'Bullying behavior', severity: 'Major', action: 'Counseling session' }] },
};

export { parentData, resultsData, feeData, attendanceData, disciplineData };
