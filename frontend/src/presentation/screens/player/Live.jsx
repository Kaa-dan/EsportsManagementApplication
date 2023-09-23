import { useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Live() {
console.log(2)
  const { user } = useSelector(state=>state.auth)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get('id');

  const myMeeting = async (element) => {
    const appID = 1376445846;
    const serverSecret = "acd372797f913dadbb734a88cf62f3e3";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      user._id,
      user.name
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      // showRemoveUserButton:roomId===user._id,
      showPreJoinView:false,
      sharedLinks: [
        {
          name: "Personal link",
          url: `http://localhost4000/live/${user.id}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
      },
    });
  };

  return (
<>
<div ref={myMeeting}/>
</>  );
}
