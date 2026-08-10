import Script from "next/script";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { VideoPlayerComponentType } from "./VideoPlayer.model";
import { VideoPlaylist } from "./VideoPlaylist";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";

// Brightcove account and player, required from the environment so they can be
// swapped per deployment. Not NEXT_PUBLIC_: this component is server-only, and
// VideoPlaylist receives the account as a prop rather than reading it client-side.
// See .env.example for the values the legacy AEM components used.
const BRIGHTCOVE_ACCOUNT = SERVER_ENV_VARS.BRIGHTCOVE_ACCOUNT_ID;
const BRIGHTCOVE_PLAYER = SERVER_ENV_VARS.BRIGHTCOVE_PLAYER_ID;

export function VideoPlayerComponent({
  content,
}: OptiComponentProps<typeof VideoPlayerComponentType>) {
  // Without the account/player ids the embed can only render a broken player
  // (`data-account` omitted, script URL 404s), so render nothing instead.
  if (!content?.id || !BRIGHTCOVE_ACCOUNT || !BRIGHTCOVE_PLAYER) {
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
