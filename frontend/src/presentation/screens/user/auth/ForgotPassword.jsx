import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  Stack,
} from "@mui/material";

import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";

import { useNavigate } from "react-router-dom";
import Login from "../../../components/user/login/Login";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <>
      <Login>
        <Container>
          <Box height={35} />
          <Box sx={{ position: "relative", top: "50%", left: "37%" }}>
            <Avatar
              sx={{
                ml: "35px",
                mb: "4px",
                bgcolor: "#ffffff",
              }}
            >
              <VideogameAssetOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Reset
            </Typography>
          </Box>
          <Box height={35} />
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
              <TextField
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
              />
            </Grid>
            <Grid item xs={12} sx={{ ml: "3rem", mr: "3rem" }}>
              <Stack direction="row" spacing={2}>
                {/* <FormControlLabel
                            sx={{ width: "60%" }}
                            onClick={() => setRemember(!remember)}
                            control={<Checkbox checked={remember} />}
                            label="remember me"
                          /> */}

                <Typography
                  variant="body1"
                  component="span"
                  onClick={() => {
                    navigate("/reset-password");
                  }}
                  style={{
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                ></Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: "10px",
                  mr: "20px",
                  borderRadius: "28",
                  color: "#ffffff",
                  minWidth: "100px",
                  backgroundColor: "purple",
                }}
              >
                Sent OTP
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                ml: "3em",
                mr: "3em",
              }}
            >
              <Stack direction="row" spacing={2}>
                <Typography
                  variant="body1"
                  component="span"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Not Registerd Yet?{" "}
                  <span
                    style={{
                      color: "#beb4fb",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Create an Account
                  </span>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Login>
    </>
  );
};

export default ForgotPassword;
