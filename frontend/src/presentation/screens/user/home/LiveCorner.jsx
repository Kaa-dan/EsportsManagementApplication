import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetStreamsMutation } from "../../../../application/slice/user/userApiSlice";
const LiveCorner = () => {
  const navigate = useNavigate();
  const [getStreamApi, { isLoading }] = useGetStreamsMutation();
  const [streams, setStreams] = useState([]);
  const getStreamHandler = async () => {
    const responce = await getStreamApi();

    setStreams(responce.data.data);
  };
  useEffect(() => {
    getStreamHandler();
  }, []);

  return (
    <Container
      sx={{
        position: "relative",
        backgroundColor: "rgba(51, 14, 98, 0.4)",
        padding: "40px 40px",
        height: "140%",
      }}
    >
      <Grid spacing={4} container>
        {streams.map((str) =>
          isLoading ? (
            <Grid key={str._id} lg={4} item>
              <Skeleton variant="rectangular" width={380} height={240} />
            </Grid>
          ) : (
            <Grid lg={4} item key={str._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="180"
                    image={str.thumbnail}
                    onClick={() => navigate(`/stream?id=${str.playerId}`)}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {str.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {str.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default LiveCorner;
