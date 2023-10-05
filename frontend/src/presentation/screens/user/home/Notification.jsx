import { useEffect, useState } from "react";
import { useOnGoingRecruitMutation } from "../../../../application/slice/admin/adminApiSlice";
import { useAcceptRecruitmentMutation } from "../../../../application/slice/user/userApiSlice";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Stack,
  CardMedia,
  Button,
  Modal,
  FormControl,
  CircularProgress,
  Container,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Photo from "../../../../assets/user/profile/profile.jpeg";
import { useSelector } from "react-redux";
import CustomPagination from "../../../components/user/dashboard/Pagination";

const Notification = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const [query, setQuery] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [onGoingRecruits, setOnGoingRecruits] = useState([]);
  const [onGoingRecruitApi, { isLoading }] = useOnGoingRecruitMutation();
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [acceptRecruitmentApi, { isLoading: acceptRecruitmentLoading }] =
    useAcceptRecruitmentMutation();

  const onGoingRecruitApiHandler = async () => {
    console.log(user);
    const responce = await onGoingRecruitApi({ query });
    setOnGoingRecruits(responce.data.data);
  };
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
  const handleUpload = async () => {
    try {
      console.log(open);
      if (selectedVideo && open._id) {
        const formData = new FormData();
        formData.append("file", selectedVideo);
        formData.append("recruitMentID", open._id);
        formData.append("user_id", user._id);
        formData.append("teamId", open.teamData[0]._id);

        console.log(formData.get("file"));
        const responce = await acceptRecruitmentApi(formData);
        console.log("res", responce);
        setOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const indexOfLastData = page * rowsPerPage;
  const indexOfFirstData = indexOfLastData - rowsPerPage;
  const currentData = onGoingRecruits.slice(indexOfFirstData, indexOfLastData);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    onGoingRecruitApiHandler();
  }, [query,page]);

  return (
    <>
      <Container
        sx={{
          position: "relative",
          backgroundColor: "rgba(51, 14, 98, 0.4)",
          padding: "40px 40px",
          height: "90%",
        }}
      >
        <Grid container spacing={4} sx={{ mb: 3 }}>
          <Grid item>
            <TextField
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1 }}
              label="Search"
            />
          </Grid>
        </Grid>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Grid spacing={4} container>
              {console.log(onGoingRecruits)}
              {currentData.map((recruits) => (
                <Grid lg={4} key={recruits._id} item>
                  <Card sx={{ display: "flex", width: 350, height: 250 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Stack spacing={1}>
                        <Typography component="div" variant="h5">
                          {recruits?.teamData[0]?.team}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Role:{recruits?.role}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          salary: {recruits?.salary}$
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          End date: {new Date(recruits?.endDate).toDateString()}
                        </Typography>
                        <div>
                          <Button
                            sx={{
                              backgroundColor: "#6e43a3",
                              color: "#ffffff",
                              borderRadius: "8px",
                              fontSize: "16px",
                              "&:hover": {
                                backgroundColor: "#330e62",
                              },
                              mb: 0,
                            }}
                            onClick={() => setOpen(recruits)}
                          >
                            Accept
                          </Button>
                        </div>
                      </Stack>
                    </CardContent>

                    <CardMedia
                      component="img"
                      sx={{ width: 120 }}
                      image={recruits?.teamData[0]?.teamPhoto}
                    />
                  </Card>
                </Grid>
              ))}
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Stack spacing={3}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Upload a selectedVideo of your gameplay
                    </Typography>

                    <FormControl>
                      <input
                        type="file"
                        id="vde"
                        accept="video/*"
                        onChange={(e) => setSelectedVideo(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                      <Button
                        variant="outlined"
                        color="primary"
                        component="label"
                        htmlFor="vde"
                      >
                        Upload File
                      </Button>
                    </FormControl>
                  </Stack>
                  {acceptRecruitmentLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Button onClick={handleUpload}>submit</Button>
                  )}
                </Box>
              </Modal>
            </Grid>
          </Box>
        )}
        {/* <Button
          variant="contained"
          color="primary"
          sx={{
            ml: 60,
            mt: 5,
            backgroundColor: "#6e43a3",
            color: "#ffffff",
            borderRadius: "8px",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#330e62",
            },
          }}
          onClick={() => setLoadMore((prev) => prev + loadMore)}
        >
          Load More
        </Button> */}
           <CustomPagination
          currentPage={page}
          totalPages={Math.ceil(onGoingRecruits.length / rowsPerPage)}
          onPageChange={onPageChange}
        />
      </Container>
    </>
  );
};

export default Notification;
