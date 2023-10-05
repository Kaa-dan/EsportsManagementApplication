
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div>
      <ReactPlayer
        url={videoUrl} // Provide the URL of the video you want to play
        width="100%"
        height="100%"
        controls // Show video controls (play, pause, volume, etc.)
      />
    </div>
  );
};

export default VideoPlayer;
