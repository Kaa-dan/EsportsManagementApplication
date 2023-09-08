// Importing custom components
import AuthComponent from "../../../components/user/auth/Auth";
import ButtonWrapper from "../../../components/user/form/Button";
import TextFieldWrapper from "../../../components/user/form/Textfield";

// Importing mui components
import { Box, Grid, Typography, Container, Avatar, Stack } from "@mui/material";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";

// Importing form redux store
import { useOtpForgotPasswordMutation } from "../../../../application/slice/user/authApiSlice";
import { setRegisterCredentials } from "../../../../application/slice/user/authSlice";
import { setOtp } from "../../../../application/slice/user/authSlice";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// Initial form state for formik
const INITIAL_FORM_STATE = {
  email: "",
};

// Form validation schema using Yup
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Hook for navigation
  const [otpFrogotPassword] = useOtpForgotPasswordMutation(); // Mutation for sending OTP
  // Submit Handler for sending OTP
  const submitHandler = async (values) => {
    try {
      const email = values.email;
      const response = await otpFrogotPassword({ email }).unwrap(); // Send OTP request

      dispatch(setOtp(response.otp)); // Update the OTP in Redux state
      dispatch(setRegisterCredentials(response.user)); // Update user credentials in Redux state
      toast(response.message)
      navigate("/forgot-password-otp"); // Navigate to the OTP verification page
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <AuthComponent>
        <Container>
          {/* Using formik */}
          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={submitHandler}
          >
            <Form>
              <Grid container spacing={1}>
                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                  <TextFieldWrapper label="Email" name="email" />
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
                    ></Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                  <ButtonWrapper
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
                  </ButtonWrapper>
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
    </>
  );
};

export default ForgotPassword;
