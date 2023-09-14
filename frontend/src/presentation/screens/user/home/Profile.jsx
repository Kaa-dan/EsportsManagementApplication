import AccountProfile from "../../../components/user/dashboard/profile";
import AccountProfileDetails from "../../../components/user/dashboard/profile2";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

const Account = () => {
  const data = {};
  return (
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

          <AccountProfile />
        </Stack>
      </Container>
    </Box>
  );
};
export default Account;
