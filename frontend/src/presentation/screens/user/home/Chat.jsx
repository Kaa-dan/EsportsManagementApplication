import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
const socket = io("http://localhost:5000");

const ChatUI = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user)
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const isBot = message.sender === "bot";
  const HandleSocketMessages = (msg) => {
    console.log(msg, "from handle");
    setMessages((message) => [...message, msg]);
  };
  useEffect(() => {
    socket.on("message", HandleSocketMessages);
    return () => {
      socket.off("message", HandleSocketMessages);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user._id && message) {
      socket.emit("sendMessage", { message, userId: user._id });
      setMessage("");
    }
  };
  console.log(messages);
  return (
    <Container
      sx={{
        position: "relative",
        backgroundColor: "rgba(51, 14, 98, 0.4)",
        padding: "40px 40px",
      }}
    >
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "rgba(110, 67, 163, 0.3)",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
          {messages.map((message, index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: isBot ? "flex-start" : "flex-end",
                mb: 2,
              }}
              key={index}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isBot ? "row" : "row-reverse",
                  alignItems: "center",
                }}
              >
                <>
                  {" "}
                  <Avatar
                    sx={{ bgcolor: isBot ? "primary.main" : "secondary.main" }}
                    src={`${user.profilePhoto}`}
                  />
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      ml: isBot ? 1 : 0,
                      mr: isBot ? 0 : 1,
                      backgroundColor: isBot ? "#631976" : "#a44fbb",
                      borderRadius: isBot
                        ? "20px 20px 20px 5px"
                        : "20px 20px 5px 20px",
                    }}
                  >
                    <Typography variant="body1">{message.message}</Typography>
                  </Paper>
                </>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ p: 2, backgroundColor: "background.default" }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                size="small"
                fullWidth
                placeholder="message"
                variant="outlined"
                value={message}
                onChange={(event) => {
                  console.log(event.target.value);
                  setMessage(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#6e43a3",
                  color: "#ffffff",
                  borderRadius: "8px",

                  fontSize: "16px",
                  "&:hover": {
                    backgroundColor: "#330e62",
                  },
                }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatUI;
