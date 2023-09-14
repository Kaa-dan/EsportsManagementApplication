import { useState } from "react";
import AdminTopbar from "../../components/admin/dashboard/AdminTopbar";
import AdminSidebar from "../../components/admin/dashboard/AdminSidebar";
import { Box, CssBaseline } from "@mui/material";
const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminTopbar {...{ open, setOpen }} />
        <AdminSidebar {...{ open, setOpen }} />
      </Box>
    </>
  );
};

export default 
AdminDashboard;
