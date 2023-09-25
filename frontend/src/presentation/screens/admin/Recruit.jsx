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
  CardMedia,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TablePagination,
} from "@mui/material";
import * as Yup from "yup";
import { useGetTeamMutation } from "../../../application/slice/admin/adminApiSlice";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useOnGoingRecruitMutation } from "../../../application/slice/admin/adminApiSlice";
import ButtonWrapper from "../../components/user/form/Button";
import TextfieldWrapper from "../../components/user/form/Textfield";
import { useRecruitPlayerMutation } from "../../../application/slice/admin/adminApiSlice";
import { useGetAcceptedRecruitmentMutation } from "../../../application/slice/admin/adminApiSlice";
import { useCreatePlayerMutation } from "../../../application/slice/admin/adminApiSlice";
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

const INITIAL_FORM_STATE = {
  salary: "",
  role: "",
};
const FORM_VALIDATION = Yup.object().shape({
  role: Yup.string()
    .min(3, "Name must be at least 5 characters")
    .required("Team name is required"),
  salary: Yup.number()
    .typeError("Strength must be a number") // Display this error if it's not a number

    .required("Strength is required"),
});
const Head = ["No", "User", "Game", "Role", "Final-date", "Gameplay", " "];
const Recruit = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [createPlayerApi] = useCreatePlayerMutation();

  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [date, setDate] = useState();
  const [acceptedRecruitmentData, setAcceptedRecruitmentData] = useState([]);

  const [recruitPlayerApi] = useRecruitPlayerMutation();
  const [getAcceptedRecruitmentApi] = useGetAcceptedRecruitmentMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [onGoingRecruitApi] = useOnGoingRecruitMutation();
  const [getTeamApi] = useGetTeamMutation();
  const [teamValue, setTeamValue] = useState("");

  const getTeamHandler = async () => {
    const responce = await getTeamApi();
    setTeams(responce.data.data);
  };
  const getAcceptedRecruitmentHandler = async () => {
    console.log("nithin");
    const responce = await getAcceptedRecruitmentApi();
    console.log(responce);
    setAcceptedRecruitmentData(responce.data.data);
  };
  const getOngoingRecruit = async () => {
    // const responce = await onGoingRecruitApi();
    // console.log(responce);
  };
  const submitHandler = async (value) => {
    console.log("hey");
    console.log("value", value);
    const responce = await recruitPlayerApi({
      date,
      team: teamValue,
      ...value,
    });

    console.log(responce);
  };
  const createPlayerHandler = async (
    userId,
    role,
    salary,
    teamId,
    AcceptRecruitId
  ) => {
    const response = await createPlayerApi({
      userId,
      role,
      salary,
      teamId,
      AcceptRecruitId,
    });
    console.log(response);
  };

  useEffect(() => {
    getTeamHandler();
    getOngoingRecruit();
    getAcceptedRecruitmentHandler();
  }, []);

  return (
    <Box>
      <Stack>
        <Container>
          <Button
            sx={{
              backgroundColor: "#6e43a3", // Change to your desired background color
              color: "#ffffff", // Change to your desired text color
              borderRadius: "8px", // Rounded corners
              padding: "12px 24px", // Padding
              fontSize: "16px", // Text size
              "&:hover": {
                backgroundColor: "#330e62", // Change to the hover background color
              },
            }}
            onClick={handleOpen}
          >
            Send RecruitMent
          </Button>
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
                    <FormControl fullWidth>
                      <Stack spacing={3}>
                        <InputLabel id="demo-simple-select-label">
                          Select Game
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={teamValue}
                          label="Select"
                          onChange={(event) => {
                            setTeamValue(event.target.value);
                          }}
                        >
                          {teams.map((team) => (
                            <MenuItem key={team._id} value={team._id}>
                              {team.team}
                            </MenuItem>
                          ))}
                        </Select>
                        <TextfieldWrapper name="salary" label="Salary" />
                        <TextfieldWrapper name="role" label="Role" />
                        <label htmlFor="date">End Date</label>
                        <input
                          onChange={(event) => setDate(event.target.value)}
                          type="date"
                          id="date"
                        />
                        <ButtonWrapper>Send</ButtonWrapper>
                      </Stack>
                    </FormControl>
                  </Form>
                </Formik>
              </Box>
            </Modal>
        </Container>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {Head.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {acceptedRecruitmentData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((loopData, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{loopData?.userId?.name}</TableCell>

                        <TableCell>{loopData.teamId.team}</TableCell>
                        <TableCell>{loopData?.recruitId?.role}</TableCell>
                        <TableCell>
                          {new Date(
                            loopData?.recruitId?.endDate
                          ).toDateString()}
                        </TableCell>
                        <TableCell>
                          <a href={loopData?.video}>
                            <Button type="outlined">View Gameplay</Button>
                          </a>
                        </TableCell>

                        <TableCell>
                          <Button
                            onClick={() => {
                              createPlayerHandler(
                                loopData?.userId?._id,
                                loopData?.recruitId?.role,
                                loopData?.recruitId?.salary,
                                loopData?.teamId._id,
                                loopData._id
                              );
                            }}
                          >
                            Accept
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[15]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      </Stack>
    </Box>
  );
};

export default Recruit;
