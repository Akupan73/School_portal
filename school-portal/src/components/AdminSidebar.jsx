import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SchoolIcon from '@mui/icons-material/School'
import SettingsIcon from '@mui/icons-material/Settings'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import AssignmentIcon from '@mui/icons-material/Assignment'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Link as RouterLink } from 'react-router-dom'

const drawerWidth = 240

export default function AdminSidebar() {
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
        <ListItem button component={RouterLink} to="/admin/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/students">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/courses">
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={RouterLink} to="/admin/announcements">
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary="Announcements" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/news">
          <ListItemIcon>
            <NewspaperIcon />
          </ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/applications">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/resources">
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="Resources" />
        </ListItem>
        <ListItem button component={RouterLink} to="/admin/parent-notifications">
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Parent Notifications" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={RouterLink} to="/admin/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  )
}
