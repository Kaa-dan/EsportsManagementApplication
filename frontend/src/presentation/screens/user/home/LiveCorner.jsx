import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetStreamsMutation } from "../../../../application/slice/user/userApiSlice";
const LiveCorner = () => {
  const navigate = useNavigate();
  const [getStreamApi] = useGetStreamsMutation();
  const [streams, setStreams] = useState([]);
  const getStreamHandler = async () => {
    const responce = await getStreamApi();
    console.log(responce);
    setStreams(responce.data.data);
  };
  useEffect(() => {
    getStreamHandler();
  }, []);
  return (
    <div>
      {streams.map((str) => (
        <div>{str?.title}
        <Button onClick={()=>navigate(`/stream?id=${str.playerId}`)}>Watch now</Button>
        </div>

      ))}
      {/* Live Corner
      <Button
        onClick={() => navigate(`/stream?id=${"6505bbc64935c4e7f535eb71"}`)}
      >
        join room
      </Button> */}
    </div>
  );
};

export default LiveCorner;
