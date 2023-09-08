import bgVideo from "../../../../assets/User/login/Login.mp4";

import { Box, Grid, ThemeProvider, createTheme } from "@mui/material";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const Auth = ({ children }) => {
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
            transform: "translate(-50%,-50%)",
            width: "50%",
            height: "50",
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
                  background: "rgba(0,0,0,0.7)",
                }}
              >
                {" "}
                <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Auth;
