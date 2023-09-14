import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const AccountProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);

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
            // src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />

          <Typography gutterBottom variant="h5">
            {userInfo.name}
          </Typography>
          <CardActions></CardActions>
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
            Email : {userInfo.email}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default AccountProfile;
