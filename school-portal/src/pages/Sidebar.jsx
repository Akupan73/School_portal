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
import NewspaperIcon from '@mui/icons-material/Newspaper'
import MailIcon from '@mui/icons-material/Mail'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { Link as RouterLink } from 'react-router-dom'

const drawerWidth = 240

export default function Sidebar() {
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
        <ListItem button component={RouterLink} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={RouterLink} to="/courses">
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
        <ListItem button component={RouterLink} to="/results">
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText primary="Results" />
        </ListItem>
        <ListItem button component={RouterLink} to="/timetable">
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Timetable" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={RouterLink} to="/news">
          <ListItemIcon>
            <NewspaperIcon />
          </ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
        <ListItem button component={RouterLink} to="/resources">
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Resources" />
        </ListItem>
        <ListItem button component={RouterLink} to="/assignments">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Assignments" />
        </ListItem>
        <ListItem button component={RouterLink} to="/messages">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
      </List>
    </Drawer>
  )
}
