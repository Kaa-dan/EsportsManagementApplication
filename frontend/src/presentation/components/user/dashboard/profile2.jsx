import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import ProfileSecond from "./profile";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AccountProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.profilePhoto}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />

          <Typography gutterBottom variant="h5">
            {user.name} <EditTwoToneIcon onClick={handleOpen} />
          </Typography>

          <CardActions>
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <ProfileSecond />
                </Box>
              </Modal>
            </div>
          </CardActions>
        </Box>
      </CardContent>
      <Divider />

      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography color="text.secondary" variant="body2">
            Email : {user.email}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default AccountProfile;
