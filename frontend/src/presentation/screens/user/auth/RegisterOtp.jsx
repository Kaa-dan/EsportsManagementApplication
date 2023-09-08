// importing custom component
import AuthComponent from "../../../components/user/auth/Auth";
import TextFieldWrapper from "../../../components/user/form/Textfield";
import ButtonWrapper from "../../../components/user/form/Button";

// importing mui components
import { Box, Grid, Typography, Container, Avatar, Stack } from "@mui/material";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";

// importing from the redux store
import { useRegisterMutation } from "../../../../application/slice/user/authApiSlice";
import { useOtpRegisterMutation } from "../../../../application/slice/user/authApiSlice";
import { setOtp } from "../../../../application/slice/user/authSlice";
import { setCredentials } from "../../../../application/slice/user/authSlice";
import { clearRegisterDetails } from "../../../../application/slice/user/authSlice";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Initial form state for formik
const INITIAL_FORM_STATE = {
  otp: "",
};

// Form validation schema using Yup
const FORM_VALIDATION = Yup.object().shape({
  otp: Yup.string()
    .required("Required")
    .matches(/^\d{4}$/, "OTP must be a 4-digit number"),
});

const RegisterOtp = () => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Redux dispatch function
  const [otpRegister] = useOtpRegisterMutation(); // Mutation to generate OTP
  const [register] = useRegisterMutation(); // Mutation for user registration
  const { userInfo } = useSelector((state) => state.auth); //Existing User info from Redux state
  const { user } = useSelector((state) => state.auth); //Registering User data from Redux state
  const otpValues = useSelector((state) => state.auth.otp); // OTP value from Redux state
  const [timer, setTimer] = useState(10); //for Otp timer

  useEffect(() => {
    //Setting  Otp timer
    let newTimer = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(newTimer);
      }
    }, 1000);
    if (userInfo) {
      // If the user is already logged in, navigate to the home page
      navigate("/");
    }
    return () => {
      clearInterval(newTimer);
    };
  }, [navigate, userInfo, timer]);

  // Resend OTP handler
  const resendHandler = async () => {
    try {
      const responce = await otpRegister({ email: user.email }).unwrap(); // Generate and resend OTP
      console.log(responce);
      dispatch(setOtp(responce)); // Update the OTP in Redux state
      setTimer(10);
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  // Submit Handler for OTP verification and registration
  const submitHandler = async (values) => {
    try {
      if (otpValues === Number(values.otp)) {
        // If the entered OTP matches the one in Redux state
        const responce = await register({
          name: user.name,
          email: user.email,
          password: user.password,
        }).unwrap(); // Register the user
        dispatch(setCredentials({ ...responce })); // Update user credentials in Redux state
        dispatch(clearRegisterDetails()); // Clear registration details from Redux state
        navigate("/"); // Navigate to the home page
      } else {
        console.log("OTP did not match");
      }
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <AuthComponent>
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
            Verify
          </Typography>
        </Box>
        <Box height={35} />
        {/* Using formik */}
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={submitHandler}
        >
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                <TextFieldWrapper name="otp" label="OTP" />
              </Grid>
              <Grid item xs={12} sx={{ ml: "3rem", mr: "3rem" }}>
                <Stack direction="row" spacing={2}>
                  {timer ? (
                    <Typography
                      variant="body1"
                      component="span"
                      style={{
                        marginTop: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Resend OTP in 00:{timer}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      component="span"
                      onClick={resendHandler}
                      style={{
                        marginTop: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Resend OTP
                    </Typography>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                <ButtonWrapper>Confirm</ButtonWrapper>
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
                    Not registered yet?{" "}
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
    </AuthComponent>
  );
};

export default RegisterOtp;
