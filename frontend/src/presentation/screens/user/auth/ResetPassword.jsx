// Importing custom components
import AuthComponent from "../../../components/user/auth/Auth";
import ButtonWrapper from "../../../components/user/form/Button";
import TextFieldWrapper from "../../../components/user/form/Textfield";

// Importing components from MUI (Material-UI)
import { Box, Grid, Typography, Container, Avatar, Stack } from "@mui/material";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";

// Importing from Redux store
import { useUpdatePasswordMutation } from "../../../../application/slice/user/authApiSlice";
import { clearRegisterDetails } from "../../../../application/slice/user/authSlice";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Define the initial form state and validation schema
const INITIAL_FORM_STATE = {
  password: "",
};
const FORM_VALIDATION = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const [updatePassword] = useUpdatePasswordMutation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // Submit Handler for password change
  const submitHandler = async (values) => {
    try {
      const responce = await updatePassword({
        password: values.password,
        user,
      });
      dispatch(clearRegisterDetails());
      navigate("/login");
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
            Reset
          </Typography>
        </Box>
        <Box height={35} />
        {/* Using Formik for form handling */}
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={submitHandler}
        >
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em", mt: "50px" }}>
                <TextFieldWrapper name="password" label="New password" />
              </Grid>
              <Grid item xs={12} sx={{ ml: "3rem", mr: "3rem" }}>
                <Stack height={50} direction="row" spacing={2}></Stack>
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

export default ResetPassword;
