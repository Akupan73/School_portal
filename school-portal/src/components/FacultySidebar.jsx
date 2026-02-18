import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SchoolIcon from '@mui/icons-material/School'
import GradeIcon from '@mui/icons-material/Grade'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { Link as RouterLink } from 'react-router-dom'

const drawerWidth = 240

export default function FacultySidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', mt: 8 }
      }}
    >
      <List>
        <ListItem button component={RouterLink} to="/faculty/courses">
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
        <ListItem button component={RouterLink} to="/faculty/grades">
          <ListItemIcon><GradeIcon /></ListItemIcon>
          <ListItemText primary="Grades" />
        </ListItem>
        <ListItem button component={RouterLink} to="/faculty/attendance">
          <ListItemIcon><ScheduleIcon /></ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  )
}
