# School Portal - Full Stack Application

A complete full-stack school management system with student and admin interfaces built with React, Material-UI, Express, and lowdb.

## Features

### Student Features
- **Dashboard** - Overview of registered courses, GPA, current semester
- **Course Registration** - Browse available courses, register, and drop courses
- **Results & Grades** - View semester grades with detailed breakdowns
- **Timetable** - Weekly class schedule with instructors and room locations
- **News & Announcements** - Stay updated with school news and important announcements
- **Messaging** - Send and receive messages from instructors and staff

### Admin Features (Akupan Desmond Ekwen)
- **Dashboard** - Overview stats, recent activity, total students/courses
- **Student Management** - View all students, add new students
- **Course Management** - Add, edit, delete courses with full control
- **Announcements** - Post urgent announcements with priority levels
- **News Management** - Post and manage school news

## Tech Stack

**Frontend:**
- React 18
- Material-UI (MUI) v5
- React Router v6
- Axios/Fetch API

**Backend:**
- Express.js
- lowdb (JSON database)
- Node.js
- CORS enabled

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd school-portal/server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Server will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to project root:
```bash
cd school-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173` (Vite default)

## Login Credentials

### Admin Account
- **Email:** akupandesmondekwen947@gmail.com
- **Password:** D1010@yaho.com
- **WhatsApp:** +237 670932755
- **Role:** School Administrator

### Student Demo Account
- **Email:** john.doe@school.com
- **Password:** student123

## Project Structure

```
school-portal/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── data/           # Mock data
│   ├── api.js          # API client functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── server/
│   ├── index.js        # Express server
│   ├── data/
│   │   └── db.json     # JSON database
│   └── package.json
├── package.json        # Frontend dependencies
├── vite.config.js      # Vite configuration
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/login` - User login

### Student Routes
- `GET /api/profile` - Get student profile
- `GET /api/courses` - Get available courses
- `POST /api/register` - Register for a course
- `GET /api/registered` - Get registered courses
- `POST /api/drop` - Drop a course
- `GET /api/results` - Get grades
- `GET /api/timetable` - Get class schedule
- `GET /api/news` - Get news
- `GET /api/announcements` - Get announcements
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send message

### Admin Routes
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/students` - All students
- `POST /api/admin/students` - Add student
- `GET /api/admin/courses` - All courses
- `POST /api/admin/courses` - Add course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course
- `POST /api/admin/announcements` - Post announcement
- `GET /api/admin/news` - Get news
- `POST /api/admin/news` - Post news

## Running Full Stack

### Terminal 1 - Backend
```bash
cd school-portal/server
npm start
```

### Terminal 2 - Frontend
```bash
cd school-portal
npm run dev
```

## Environment Variables

Create a `.env` file in `school-portal/` (optional):
```
VITE_API_URL=http://localhost:4000
```

## Database

The backend uses lowdb which stores data in `server/data/db.json`. Data persists between restarts.

## Features Overview

| Feature | Student | Admin |
|---------|---------|-------|
| View Courses | ✓ | ✓ |
| Register Courses | ✓ | - |
| View Grades | ✓ | - |
| View Timetable | ✓ | - |
| Read News | ✓ | ✓ |
| Send Messages | ✓ | ✓ |
| Manage Students | - | ✓ |
| Manage Courses | - | ✓ |
| Post Announcements | - | ✓ |
| Post News | - | ✓ |
| Dashboard | ✓ | ✓ |

## Notes

- All data is stored locally in `server/data/db.json`
- No authentication tokens are enforced (demo version)
- Production version should use JWT, database (PostgreSQL/MongoDB), and environment variables
- Responsive design works on desktop, tablet, and mobile

## Future Enhancements

- Database migration to PostgreSQL/MongoDB
- JWT token-based authentication
- File uploads for assignments
- Real-time messaging with WebSockets
- Email notifications
- Payment integration for admissions
- Mobile app with React Native
- Dark mode theme
- Multi-language support

## Support

For issues or questions, contact the admin or system administrator.

---

**Admin Contact:**
- Email: akupandesmondekwen947@gmail.com
- WhatsApp: +237 670932755
