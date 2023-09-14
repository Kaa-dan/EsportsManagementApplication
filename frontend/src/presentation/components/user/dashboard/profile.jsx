import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useUpdateProfileMutation } from "../../../../application/slice/user/userApiSlice";
import TextfieldWrapper from "../form/Textfield";
import ButtonWrapper from "../form/Button";
import { useSelector } from "react-redux";
import { useState } from "react";
// Initial form state for formik
const INITIAL_FORM_STATE = {
  name: "",

  password: "",
};
// Form validation schema using Yup
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().min(5, "Name must be at least 5 characters"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "Password must contain at leastone  one special character"
    ),
  // profilePhoto: Yup.mixed().required("File is required"),
});
const AccountProfileDetails = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [updatProfile] = useUpdateProfileMutation();
  let [imageFile, setImageFile] = useState(null);
  const submitHandler = async (value) => {
    try {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("password", value.password);
      formData.append("profilePhoto", imageFile);
      const responce = await updatProfile(formData);
      console.log(responce);
    } catch (error) {}
  };
  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      validationSchema={FORM_VALIDATION}
      onSubmit={submitHandler}
    >
      <Form encType="multipart/form-data">
        <Card>
          <CardHeader subheader="The information can be edited" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextfieldWrapper name="name" label="Username" />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextfieldWrapper name="password" label="Password" />
                </Grid>
                <Grid xs={12} md={6}></Grid>

                <Grid xs={12} md={6}>
                  {/* <Field
                    type="file"
                    name="profilePhoto"
                    id="profilePhoto"
                    hidden
                    // onChange={(event) => {
                    //   form.setFieldValue('profilePhoto', event.currentTarget.profilePhoto[0]);
                    // }}

                  /> */}
                  {/* <TextfieldWrapper
                    type="file"
                    name="profilePhoto"
                    id="profilePhoto"
                    onChange={(e) => {
                      imageFile = e.target.files[0];
                      
                    }}
                  /> */}
                  <input
                    hidden
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    onChange={(event) => {
                      setImageFile(event.currentTarget.files[0]);
                    }}
                  />
                  <Button variant="outlined">
                    <label htmlFor="profilePhoto">
                      Upload new ProfileImage{<CloudUploadIcon />}
                    </label>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <ButtonWrapper>Save details</ButtonWrapper>
          </CardActions>
        </Card>
      </Form>
    </Formik>
  );
};

export default AccountProfileDetails;
