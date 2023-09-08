// Importing custom components
import AuthComponent from "../../../components/user/auth/Auth";
import TextFieldWrapper from "../../../components/user/form/Textfield";
import ButtonWrapper from "../../../components/user/form/Button";

// Importing MUI (Material-UI) components
import { Box, Grid, Typography, Container, Avatar, Stack } from "@mui/material";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";

// Importing from Redux store
import { useOtpForgotPasswordMutation } from "../../../../application/slice/user/authApiSlice";
import { setOtp } from "../../../../application/slice/user/authSlice";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// Define the initial form state and validation schema
const INITIAL_FORM_STATE = {
  otp: "",
};
const FORM_VALIDATION = Yup.object().shape({
  otp: Yup.string()
    .required("Required")
    .matches(/^\d{4}$/, "OTP must be a 4-digit number"),
});

const ForgotPasswordOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otpFrogotPassword] = useOtpForgotPasswordMutation();
  const otpValues = useSelector((state) => state.auth.otp);
  const { user } = useSelector((state) => state.auth);
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    //Setting  Otp timer
    let newTimer = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(newTimer);
      }
    }, 1000);

    return () => {
      clearInterval(newTimer);
    };
  }, [navigate, timer]);
  // Handler to resend OTP
  const resendHandler = async () => {
    try {
      const responce = await otpFrogotPassword({ email: user.email }).unwrap();
      console.log(responce);
      dispatch(setOtp(responce.otp));
      setTimer(10);
      toast(responce.message);
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  // Handler for form submission
  const submitHandler = async (values) => {
    try {
      console.log(otpValues);
      // Check if entered OTP matches stored OTP
      if (otpValues === Number(values.otp)) {
        toast("Enter your new password");
        navigate("/reset-password");
      }
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  return (
    <AuthComponent>
      <Container>
        {/* Using Formik for form handling */}
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
                {/* Button for form submission */}
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

export default ForgotPasswordOtp;
