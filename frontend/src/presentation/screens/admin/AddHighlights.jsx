import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAddHighlighMutation } from "../../../application/slice/admin/adminApiSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#330e62",
  border: "7px solid #6e43a3",
  boxShadow: 24,
  p: 7,
  borderRadius: "10px",
  color: "white",
};
const AddHighlights = () => {
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [discription, setDiscription] = useState("");
  const [addHighlightApi] = useAddHighlighMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const HighlightSubmitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("discription", discription);
      formData.append("video", selectedVideo);
      const responce = await addHighlightApi(formData);
    } catch (error) {}
  };
  return (
    <Container
      sx={{
        position: "relative",
        backgroundColor: "rgba(51, 14, 98, 0.4)",
        padding: "40px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "650px",
      }}
    >
      <Grid container>
        <Grid item>
          <Button
            onClick={handleOpen}
            style={{
              backgroundColor: "#6e43a3",
              color: "#ffffff",
              borderRadius: "8px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#330e62",
              },
            }}
          >
            Add Highlights
          </Button>
        </Grid>
      </Grid>

      {/* Modal  */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack>
            <TextareaAutosize
              color="primary"
              minRows={3}
              maxRows={6}
              aria-label="description"
              placeholder="Description"
              onChange={(e) => setDiscription(e.target.value)}
            />
            <input
              type="file"
              id="vde"
              accept="video/*"
              onChange={(e) => setSelectedVideo(e.target.files[0])}
              style={{ display: "none" }}
              required
            />
            <Button
              variant="outlined"
              color="primary"
              component="label"
              htmlFor="vde"
              sx={{ mt: 3, mb: 3 }}
            >
              Upload File
            </Button>
            <Button
              style={{
                backgroundColor: "#6e43a3",
                color: "#ffffff",
                borderRadius: "8px",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#330e62",
                },
              }}
              onClick={HighlightSubmitHandler}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default AddHighlights;
