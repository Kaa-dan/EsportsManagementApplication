import bgVideo from "../../../../assets/User/login/Login.mp4";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const Auth = ({ children }) => {
  const location = useLocation();
  const pathname = location?.pathname;
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.down("lg"));
  const md = useMediaQuery(breakpoints.down("md"));
  const sm = useMediaQuery(breakpoints.down("sm"));
  return (
    <>
      <div
        style={{
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "50%",
            transform: "translate(-50%,-50%)",
            width: lg ? (md ? (sm ? "100%" : "75%") : "50%") : "40%",
            height: "70%",
            background: "rgba(0,0,0,0.7)",
            boxShadow: 24,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} lg={12}>
              <Box
                sx={{
                  backgroundSize: "cover",
                  height: "50vh",
                  minHeight: "500px",
                }}
              >
                {/* <ThemeProvider theme={darkTheme}> */}
                <Box height={35} />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box>
                    <Avatar
                      sx={{
                        ml: "35px",
                        mb: "4px",
                        bgcolor: "#ffffff",
                      }}
                    >
                      <VideogameAssetOutlinedIcon />
                    </Avatar>{" "}
                    <Typography component="h1" variant="h4">
                      Sign In
                    </Typography>
                  </Box>
                </Box>
                <Box height={35} />
                {children}
                {/* </ThemeProvider> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Auth;
