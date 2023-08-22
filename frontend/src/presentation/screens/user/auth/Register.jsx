import { Box, Grid, Typography, Container, Avatar, Stack } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import axios from "axios";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import { useNavigate } from "react-router-dom";
import Login from "../../../components/user/login/Login";

import TextFieldWrapper from "../../../components/user/form/Textfield";
import ButtonWrapper from "../../../components/user/form/Button";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  password: "",
};
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters"),

  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  // ),
});

const Register = () => {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log(values)
    console.log("nithin")
    const responce = await axios
      .post("http://localhost:5000/api/register", values)
      .catch((err) => {
        if (err && err.response) console.log("Error:", err);
      });
    if (responce) {
      console.log("successssssssss");
    }
  };
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
              Register
            </Typography>
          </Box>
          <Box height={35} />
          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={onSubmit}
          >
            <Form>
              <Grid container spacing={1}>
                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                  {/* <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                  /> */}
                  <TextFieldWrapper name="name" label="Username" />
                </Grid>
                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                  {/* <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
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
                  <TextFieldWrapper
                    name="password"
                    label="Password"
                    type="password"
                  />
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
                    Register
                  </Button> */}
                  <ButtonWrapper>Register</ButtonWrapper>
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
                      Already have an account?{" "}
                      <span
                        style={{
                          color: "#beb4fb",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Go to Sign in
                      </span>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Login>
    </>
  );
};

export default Register;
