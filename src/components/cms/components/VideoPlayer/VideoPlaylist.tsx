"use client";

import { useEffect, useRef } from "react";

/**
 * Brightcove gallery ("experience") embed.
 *
 * Their live.js locates the `data-experience` div, then writes the gallery into a
 * same-origin blank iframe it creates — which is how it can measure the content and
 * size the iframe to fit exactly (no inner scrollbar). Embedding
 * `experience_{id}/share.html` cross-origin instead loses that: it sends no resize
 * postMessage, so any height we pick is a guess and Brightcove scrolls its content
 * inside. Hence live.js.
 *
 * It has to be injected from an effect rather than via `next/script`, though:
 * next/script can fire before the div is mounted (live.js then dies with
 * "Cannot read properties of null (reading 'setAttribute')") and it dedupes by src,
 * so on a client-side navigation it may never re-run, leaving an empty div. An
 * effect guarantees the div exists first and re-runs on every mount.
 */
export function VideoPlaylist({
  id,
  account,
}: {
  id: string;
  account: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const script = document.createElement("script");
    script.src = `https://players.brightcove.net/${account}/experience_${id}/live.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      // live.js injects its iframe into our div; drop it so a remount starts clean
      // instead of stacking a second gallery.
      host?.replaceChildren();
    };
  }, [id, account]);

  return <div ref={hostRef} data-experience={id} />;
}
