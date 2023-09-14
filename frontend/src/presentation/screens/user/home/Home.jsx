import { Box, CssBaseline } from "@mui/material";
import TopBar from "../../../components/user/dashboard/TopBar";
import SideBar from "../../../components/user/dashboard/SideBar";
import { useState } from "react";
const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar {...{ open, setOpen }} />
        <SideBar {...{ open, setOpen }} />
      </Box>
    </>
  );
};

export default Home;
