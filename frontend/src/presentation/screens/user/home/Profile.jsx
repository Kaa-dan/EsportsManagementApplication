import AccountProfile from "../../../components/user/dashboard/profile";
import AccountProfileDetails from "../../../components/user/dashboard/profile2";
import profilebg from "../../../../assets/user/profile/profilebg.gif";
import { Box, Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";

const Account = () => {
  return (
    <div
      style={{
        backgroundSize: "cover",
        height: "50vh",
        color: "#f5f5f5",
        // backgroundColor: "black",
        background: `url(${profilebg})`,
        // backgroundRepeat:"no-repeat"
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <AccountProfileDetails />

            {/* <AccountProfile /> */}
          </Stack>
        </Container>
      </Box>
    </div>
  );
};
export default Account;
