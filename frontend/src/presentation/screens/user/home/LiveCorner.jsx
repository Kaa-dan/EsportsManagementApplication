import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Skeleton,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetHighlightMutation } from "../../../../application/slice/admin/adminApiSlice";

import { useGetStreamsMutation } from "../../../../application/slice/user/userApiSlice";
import { Box, Stack } from "@mui/system";
import VideoPlayer from "../../../components/user/dashboard/VideoPlayer";
const LiveCorner = () => {
  const [highlightData, setHighlightData] = useState([]);
  const navigate = useNavigate();
  const [getStreamApi, { isLoading }] = useGetStreamsMutation();
  const [streams, setStreams] = useState([]);
  const [getHighlightApi] = useGetHighlightMutation();
  const [query, setQuery] = useState("");
  const getStreamHandler = async () => {
    const responce = await getStreamApi();

    setStreams(responce.data.data);
  };
  const getHighlightHandler = async () => {
    try {
      const responce = await getHighlightApi({ query });
      console.log(responce);
      setHighlightData(responce.data.data);
    } catch (error) {
      dyncamicToast(error?.message);
    }
  };
  useEffect(() => {
    getStreamHandler();
    getHighlightHandler();
  }, []);

  return (
    <>
    <Stack spacing={3} sx={{m:4}}>
    <Grid spacing={3} container>
        {streams.map((str) =>
          isLoading ? (
            <Grid key={str._id} lg={4} item>
              <Skeleton variant="rectangular" width={380} height={240} />
            </Grid>
          ) : (
            <Grid lg={4} item key={str._id}>
              <Card sx={{ maxWidth: 345,width:380,height:240 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="180"
                    image={str.thumbnail}
                    onClick={() => navigate(`/stream?id=${str.playerId}`)}
                  />
                  <CardContent>
                  <Typography component="span" sx={{ fontSize: "12px" }}>
                  {str?.title}
                </Typography>
                <Typography
                  sx={{
                    borderRadius: "5px",
                  }}
                  gutterBottom
                >
                  {str?.description}
                </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        )}
      </Grid>
<Divider/>
      <Grid container spacing={3} direction="row">
        {highlightData.map((data) => {
          return (
            <Grid key={data._id} item>
              <Card sx={{ maxWidth: 345 }}>
                <VideoPlayer videoUrl={data?.video} />

                <Typography component="span" sx={{ fontSize: "12px" }}>
                  {new Date(data?.timestamp).toLocaleDateString()}
                </Typography>
                <Typography
                  sx={{
                    borderRadius: "5px",
                  }}
                  gutterBottom
                >
                  {data?.discription}
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
     
    </>
  );
};

export default LiveCorner;
