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
} from "@mui/material";
import Photo from "../../../../assets/user/profile/profile.jpeg";
import { useSelector } from "react-redux";
const Notification = () => {
  const { user } = useSelector((state) => state.auth);
  const [onGoingRecruits, setOnGoingRecruits] = useState([]);
  const [onGoingRecruitApi] = useOnGoingRecruitMutation();
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [acceptRecruitmentApi] = useAcceptRecruitmentMutation();

  const onGoingRecruitApiHandler = async () => {
    console.log(user);
    const responce = await onGoingRecruitApi();
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
  const handleUpload = async (id, teamId) => {
    try {
      console.log(teamId)
      if (selectedVideo && id) {
        const formData = new FormData();
        formData.append("file", selectedVideo);
        formData.append("recruitMentID", id);
        formData.append("user_id", user.id);
        formData.append("teamId", teamId);

        console.log(formData.get("file"));
        const responce = await acceptRecruitmentApi(formData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    onGoingRecruitApiHandler();
  }, []);

  return (
    <Box>
      <Grid container>
        {onGoingRecruits.map((recruits) => (
          <Grid key={recruits._id} item>
            <Card sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Stack spacing={1}>
                    <Typography component="div" variant="h5">
                      Game: {recruits?.team?.team}
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
                      <Button onClick={() => setOpen(true)}>Accept</Button>
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
                                onChange={(e) =>
                                  setSelectedVideo(e.target.files[0])
                                }
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
                          
                          <Button
                            onClick={() => {
                              handleUpload(recruits._id, recruits.team._id);
                            }}
                          >
                            submit
                          </Button>
                        </Box>
                      </Modal>
                    </div>
                  </Stack>
                </CardContent>
              </Box>
              <CardMedia component="img" sx={{ width: 151 }} image={Photo} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Notification;
