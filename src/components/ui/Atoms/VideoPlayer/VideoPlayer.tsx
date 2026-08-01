import { JSX } from 'react';

interface VideoPlayerProps extends React.HTMLAttributes<HTMLElement> {
  controls?: boolean;
  videoId: string;

}
// TODO Set account and player by config
const VideoPlayer = (props: VideoPlayerProps): JSX.Element => {
  return (
    <div>
        <video controls={props.controls}
          data-video-id={props.videoId}
          data-account="3816841626001"
          data-player="FvKmvD2Sc"
          data-embed="default">
        </video>
        <script src="//players.brightcove.net/3816841626001/FvKmvD2Sc_default/index.min.js"></script>
      </div> )
};

export default VideoPlayer;

