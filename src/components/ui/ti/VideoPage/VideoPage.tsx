import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ReactVideoPlayer } from "./ReactVideoPlayer";

type Video = {
  id: string;
  src: string;
  poster: string | null;
  title: string;
  description: string;
};

type Props = {
  /** The video id taken from the URL, e.g. `/en/video/6399222900112`. */
  id: string;
};

/**
 * Renders a single video by id, fetched from the local API at
 * `/api/videos/[id]` (which resolves the source from Brightcove).
 *
 * One route handles every id — there is no page per video.
 * `/en/video/6399315429112`, `/en/video/6399222900112`, … all render here.
 */
export async function VideoPage({ id }: Props) {
  // Server-side fetch needs an absolute URL — derive it from the request host.
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/videos/${encodeURIComponent(id)}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    notFound();
  }

  const video = (await res.json()) as Video;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <ReactVideoPlayer src={video.src} poster={video.poster} />

      <div className="mt-4 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{video.title}</h1>

        {video.description && (
          // Brightcove returns the long description as an HTML string.
          <div
            className="text-neutral-700 [&_a]:underline [&_p]:my-2"
            dangerouslySetInnerHTML={{ __html: video.description }}
          />
        )}
      </div>
    </div>
  );
}
