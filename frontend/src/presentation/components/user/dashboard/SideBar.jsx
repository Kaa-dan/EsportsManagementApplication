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
  Button,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../application/slice/user/authSlice";
import { useLogoutMutation } from "../../../../application/slice/user/authApiSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProfileImage from "../../../../assets/user/profile/profile.jpeg";
import { toast } from "react-toastify";
import { useMemo } from "react";
import Profile from "../../../screens/user/home/Profile";
import LiveCorner from "../../../screens/user/home/LiveCorner";
import Person4Icon from "@mui/icons-material/Person4";
import Fans from "../../../screens/admin/Fans";
import Recruit from "../../../screens/admin/Recruit";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Teams from "../../../screens/admin/Teams";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notification from "../../../screens/user/home/Notification";
import LiveTvTwoToneIcon from "@mui/icons-material/LiveTvTwoTone";
import Live from "../../../screens/player/Live";
import LiveSetup from "../../../screens/player/LiveSetup";
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
  const handleOpen = () => setProfileOpen(true);
  const handleClose = () => setProfileOpen(false);
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
        {
          title: "Go live",
          icon: <LiveTvTwoToneIcon />,
          link: `stream`,
          component: <Live />,
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
        <DrawerHeader>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Kaadan Esports
          </Typography>
          <IconButton onClick={() => setOpen(!open)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
          <Tooltip>
            <Avatar
              onClick={handleOpen}
              src={ProfileImage}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
          <div>
            <Modal
              open={profileOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Profile />
              </Box>
            </Modal>
          </div>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          {open && (
            <Typography>
              {console.log(user.name)}
              {user ? user.name : null}

              <Tooltip>
                <IconButton>
                  <SentimentSatisfiedAltIcon />
                </IconButton>
              </Tooltip>
            </Typography>
          )}
        </Box>
        <List>
          {list.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
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
