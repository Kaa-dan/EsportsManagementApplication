import {
  Stack,
  Box,
  Container,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Modal,
  Typography,
  Divider,
  CardActions,
  Unstable_Grid2,
  CardMedia,
} from "@mui/material";
import * as Yup from "yup";
import { useCreateTeamMutation } from "../../../application/slice/admin/adminApiSlice";
import { useGetTeamMutation } from "../../../application/slice/admin/adminApiSlice";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import ButtonWrapper from "../../components/user/form/Button";
import TextfieldWrapper from "../../components/user/form/Textfield";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const FORM_VALIDATION = Yup.object().shape({
  team: Yup.string()
    .min(5, "Name must be at least 5 characters")
    .required("Team name is required"),
  strength: Yup.number()
    .typeError("Strength must be a number") // Display this error if it's not a number
    .positive("Strength must be a positive number") // Optionally, ensure it's positive
    .integer("Strength must be an integer") // Optionally, ensure it's an integer
    .required("Strength is required"),
  // profilePhoto: Yup.mixed().required("File is required"),
});
const INITIAL_FORM_STATE = {
  team: "",
  strength: "",
};
const Teams = () => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [image, setImageFile] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [createTeamApi] = useCreateTeamMutation();
  const [getTeamApi] = useGetTeamMutation();
  const getTeamHandler = async () => {
    const responce = await getTeamApi();
    setTeams(responce.data.data);
  };
  useEffect(() => {
    getTeamHandler();
  }, []);
  const head = ["No", "Avatar", "Team-Name", "Strength"];
  const submitHandler = async (value) => {
    try {
      const formData = new FormData();
      formData.append("team", value.team);
      formData.append("strength", value.strength);
      formData.append("teamPhoto", image);
      const responce = await createTeamApi(formData);
      console.log(responce);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Stack>
        <Container>
          <div>
            <Button onClick={handleOpen}>Create Team</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Formik
                  initialValues={{ ...INITIAL_FORM_STATE }}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={submitHandler}
                >
                  <Form encType="multipart/form-data">
                    <Card>
                      <CardHeader subheader="Enter Team Details" />

                      <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <TextfieldWrapper name="team" label="Team-name" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextfieldWrapper
                                name="strength"
                                label="Strength"
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <input
                                required
                                hidden222
                                id="team"
                                name="teamPhoto"
                                type="file"
                                onChange={(event) => {
                                  setImageFile(event.currentTarget.files[0]);
                                }}
                              />
                              
                              <Button variant="outlined">
                                <label htmlFor="team">Upload image</label>
                              </Button>
                              <Card sx={{ maxWidth: 345 }}>
                                {/* <CardMedia
                                  sx={{ height: 140 }}
                                  // src={
                                  //   imageFile ? imageFile : user.profilePhoto
                                  // }
                                  title="Profile photo"
                                /> */}
                                {/* {console.log(user.profilePhoto)} */}
                              </Card>
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
              </Box>
            </Modal>
          </div>

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {head.map((value) => (
                      <TableCell key={value}>{value}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {teams.map((team, index) => {
                    console.log(team);
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Avatar alt="profile avatar" src={team.teamPhoto} />
                        </TableCell>
                        <TableCell>{team.team}</TableCell>
                        <TableCell>{team.strength}</TableCell>
                        <TableCell>
                          <Button>Block</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
        
      </Stack>
    </Box>
  );
};

export default Teams;
