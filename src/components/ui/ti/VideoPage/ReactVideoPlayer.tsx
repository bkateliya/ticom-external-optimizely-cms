"use client";

import ReactPlayer from "react-player";

type Props = {
  /** Playable source URL (HLS manifest or MP4). */
  src: string;
  poster?: string | null;
};

/**
 * Full-width 16:9 player. react-player handles HLS (via hls.js), DASH and MP4
 * from the source URL resolved by the Brightcove Playback API.
 */
export function ReactVideoPlayer({ src, poster }: Props) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
      <ReactPlayer
        src={src}
        poster={poster ?? undefined}
        controls
        width="100%"
        height="100%"
        playsInline
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
