import Script from 'next/script';
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
        <Script src="//players.brightcove.net/3816841626001/FvKmvD2Sc_default/index.min.js"></Script>
      </div> )
};

export default VideoPlayer;

