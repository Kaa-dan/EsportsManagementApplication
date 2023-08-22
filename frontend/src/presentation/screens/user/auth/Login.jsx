import Login from "../../../components/user/login/Login";
import {
  Box,
  Grid,
  Typography,
  Container,
  Avatar,
  Stack,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import TextFieldWrapper from "../../../components/user/form/Textfield";
import ButtonWrapper from "../../../components/user/form/Button";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")

    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    // ),
});

const LoginMain = () => {
  const navigate = useNavigate();

  return (
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
            Sign In
          </Typography>
        </Box>
        <Box height={35} />
        {/* Using formik  */}
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(value) => {
            console.log(value);
          }}
        >
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                {/* <TextField
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="email"
                  autoComplete="email"
                /> */}
                <TextFieldWrapper name="email" label="Email" />
              </Grid>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                {/* <TextField 
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                /> */}
                <TextFieldWrapper name="password" label="Password" />
              </Grid>
              <Grid item xs={12} sx={{ ml: "3rem", mr: "3rem" }}>
                <Stack direction="row" spacing={2}>
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
                  >
                    Forgot password?
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                {/* <Button
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
                  Sign in
                </Button> */}
                <ButtonWrapper>Sign In</ButtonWrapper>
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
                    Not registerd yet?{" "}
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
          </Form>
        </Formik>
      </Container>
    </Login>
  );
};

export default LoginMain;
