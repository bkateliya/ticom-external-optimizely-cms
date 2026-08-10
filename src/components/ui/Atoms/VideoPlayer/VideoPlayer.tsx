import { SERVER_ENV_VARS } from "@/lib/env/server-env";
import Script from "next/script";
import { JSX } from "react";

interface VideoPlayerProps extends React.HTMLAttributes<HTMLElement> {
  controls?: boolean;
  videoId: string;
}
const VideoPlayer = (props: VideoPlayerProps): JSX.Element => {
  const BRIGHTCOVE_ACCOUNT = SERVER_ENV_VARS.BRIGHTCOVE_ACCOUNT_ID;
  const BRIGHTCOVE_PLAYER = SERVER_ENV_VARS.BRIGHTCOVE_PLAYER_ID;

  return (
    <div>
      <video
        controls={props.controls}
        data-video-id={props.videoId}
        data-account={BRIGHTCOVE_ACCOUNT}
        data-player={BRIGHTCOVE_PLAYER}
        data-embed="default"
      ></video>
      <Script
        src={`https://players.brightcove.net/${BRIGHTCOVE_ACCOUNT}/${BRIGHTCOVE_PLAYER}_default/index.min.js`}
      ></Script>
    </div>
  );
};

export default VideoPlayer;
