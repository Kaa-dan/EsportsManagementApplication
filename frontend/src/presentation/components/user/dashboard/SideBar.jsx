import React, { useState } from "react";
import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Box,
  Typography,
  Tooltip,
  Avatar,
  Modal,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ProfileImage from "../../../../assets/user/profile/profile.jpeg";
import banner from "../../../../assets/user/dashboard/banner.gif";
// mui icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import LiveTvTwoToneIcon from "@mui/icons-material/LiveTvTwoTone";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Person4Icon from "@mui/icons-material/Person4";
import MenuOpenTwoToneIcon from "@mui/icons-material/MenuOpenTwoTone";

// custom fans component
import Profile from "../../../screens/user/home/Profile";
import Notification from "../../../screens/user/home/Notification";
import LiveCorner from "../../../screens/user/home/LiveCorner";

// custom player component
import LiveSetup from "../../../screens/player/LiveSetup";
import Live from "../../../screens/player/Live";

// custom admin component
import Fans from "../../../screens/admin/Fans";
import Teams from "../../../screens/admin/Teams";
import Recruit from "../../../screens/admin/Recruit";

// redux store
import { logout } from "../../../../application/slice/user/authSlice";
import { useLogoutMutation } from "../../../../application/slice/user/authApiSlice";

import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMemo } from "react";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SideBar = ({ open, setOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileOpenHandler = () => setProfileOpen(true);
  const profileCloseHandler = () => setProfileOpen(false);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  let list = [];
  if (user) {
    if (user.role === "fan") {
      list = useMemo(() => [
        {
          title: "Livecorner",
          icon: <LiveTvIcon />,
          link: "live-corner",
          component: <LiveCorner />,
        },
        {
          title: "Notification",
          icon: <NotificationsIcon />,
          link: "notification",
          component: <Notification />,
        },
      
      ]);
    } else if (user.role === "admin") {
      list = useMemo(() => [
        {
          title: "Fans",
          icon: <Person4Icon />,
          link: "fans",
          component: <Fans />,
        },
        {
          title: "Recruit",
          icon: <ContactMailIcon />,
          link: "recruit",
          component: <Recruit />,
        },
        {
          title: "Teams",
          icon: <Diversity1Icon />,
          link: "teams",
          component: <Teams />,
        },
      ]);
    } else {
      list = useMemo(() => [
        {
          title: "Livecorner",
          icon: <LiveTvIcon />,
          link: "go-live",
          component: <LiveSetup />,
        },
      ]);
    }
  }

  const logOutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/auth/login");
    } catch (err) {
      toast(err);
    }
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between",
            // backgroundImage: `url(${banner})`,
            // backgroundSize: "cover",

            backgroundPosition: "center center",
          }}
        >
          <IconButton onClick={() => setOpen(!open)}>
            <MenuOpenTwoToneIcon />
          </IconButton>
        </DrawerHeader>

        <Box sx={{ mx: "auto", mt: 1, mb: 2 }}>
          <Tooltip>
            <Avatar
              onClick={profileOpenHandler}
              src={ProfileImage}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
          <div>
            <Modal
              open={profileOpen}
              onClose={profileCloseHandler}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Profile />
              </Box>
            </Modal>
          </div>
        </Box>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          {open && (
            <Typography
              sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#333" }}
            >
              {user ? user.name : null}
            </Typography>
          )}
        </Box>

        <Divider />
        <List>
          {list.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block", mt: 1, mb: 1 }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          <Divider />
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={logOutHandler}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Box></Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {/* Rendering components based on routes */}
        <Routes>
          {list.map((item) => (
            <Route key={item.link} path={item.link} element={item.component} />
          ))}
          <Route path={"/stream"} element={<Live />} />
        </Routes>
      </Box>
    </>
  );
};

export default SideBar;
