import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useCreateLiveMutation } from "../../../application/slice/player/playerApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LiveSetup = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDiscription] = useState(null);
  const [createLive] = useCreateLiveMutation();
  const startLiveHandler = async () => {
    
    const formData = new FormData();
    formData.append("playerId", user.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", image); // Corrected "thumpnail" to "thumbnail"

    try {
      const response = await createLive(formData);
      console.log(response)
      if(response){
        navigate(`/stream?id=${user.id}`)
      }
      // Handle the response as needed
    } catch (error) {
      // Handle errors, e.g., network error or server error
      console.error(error);
    }
  };

  return (
    <div>
      <Stack spacing={2}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          label="title"
        />
        <TextField
          name="description"
          label="description"
          multiline
          rows={3}
          onChange={(e) => setDiscription(e.target.value)}
        />
        <input
          type="file"
          id="thumpnail"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ display: "none" }}
        />
        <Button
          variant="outlined"
          color="primary"
          component="label"
          htmlFor="thumpnail"
        >
          Upload File
        </Button>
        <Button onClick={startLiveHandler} size="small">
          Start Live
        </Button>
      </Stack>
    </div>
  );
};

export default LiveSetup;
