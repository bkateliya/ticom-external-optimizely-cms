import Script from "next/script";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { VideoPlayerComponentType } from "./VideoPlayer.model";
import { VideoPlaylist } from "./VideoPlaylist";

const BRIGHTCOVE_ACCOUNT = "3816841626001";
const BRIGHTCOVE_PLAYER = "whbLb5T2i";

export function VideoPlayerComponent({
  content,
}: OptiComponentProps<typeof VideoPlayerComponentType>) {
  if (!content?.id) {
    return null;
  }

  if (content.videoPlayerType === "videoPlaylist") {
    return <VideoPlaylist id={content.id} account={BRIGHTCOVE_ACCOUNT} />;
  }

  return (
    <>
      <div className="relative aspect-video">
        {/* Brightcove copies this className onto the player div it generates, then
            sizes it from its own unlayered stylesheet (300x150 default). Layered
            Tailwind utilities lose to unlayered CSS, so these need `!`. */}
        <video
          className="video-js absolute! inset-0! h-full! w-full!"
          controls
          data-account={BRIGHTCOVE_ACCOUNT}
          data-player={BRIGHTCOVE_PLAYER}
          data-embed="default"
          data-application-id=""
          data-video-id={content.id}
        />
      </div>
      <Script
        src={`https://players.brightcove.net/${BRIGHTCOVE_ACCOUNT}/${BRIGHTCOVE_PLAYER}_default/index.min.js`}
      />
    </>
  );
}
