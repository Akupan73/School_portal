import React from "react";
import { Box } from "@mui/material";
 
 
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <AdminSidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;