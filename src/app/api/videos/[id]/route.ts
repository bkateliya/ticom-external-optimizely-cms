// Brightcove account + policy key (read from the d0PyGHVSu player config).
// The policy key is a public, read-only key safe to use client-side.
const ACCOUNT_ID = "3816841626001";
const POLICY_KEY =
  "BCpkADawqM3ia-GufsUDbnkracWB2djb4nCLglrr6pjr0aLS-xRYcsErkJSL28FsBE4ECLiaNwVLZdMCDJhqLzKtD0t7IR5XILQ6u8z__SgkWKl_YDq4M1qZqUsTYm9HYhxFvXFAUizkldaO";

type Source = {
  src?: string;
  type?: string;
  container?: string;
};

type PlaybackResponse = {
  name?: string;
  description?: string;
  long_description?: string;
  poster?: string;
  thumbnail?: string;
  sources?: Source[];
};

/** Pick the best playable source for react-player: prefer https HLS, then MP4. */
function pickSource(sources: Source[] = []): string | null {
  const https = sources.filter((s) => s.src?.startsWith("https"));
  const hls = https.find((s) => s.type === "application/x-mpegURL");
  if (hls?.src) return hls.src;
  const mp4 = https.find((s) => (s.container ?? s.type) === "MP4");
  return mp4?.src ?? https[0]?.src ?? null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const res = await fetch(
    `https://edge.api.brightcove.com/playback/v1/accounts/${ACCOUNT_ID}/videos/${encodeURIComponent(
      id,
    )}`,
    {
      headers: { Accept: `application/json;pk=${POLICY_KEY}` },
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    return Response.json({ message: "Video not found" }, { status: 404 });
  }

  const data = (await res.json()) as PlaybackResponse;
  const src = pickSource(data.sources);

  if (!src) {
    return Response.json({ message: "No playable source" }, { status: 404 });
  }
  console.log("@@", data)

  return Response.json({
    id,
    src,
    poster: data.poster ?? data.thumbnail ?? null,
    title: data.name ?? `Video ${id}`,
    description: data.long_description ?? data.description ?? "",
  });
}
