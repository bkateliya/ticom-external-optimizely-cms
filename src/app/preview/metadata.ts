import { cached } from "@/lib/data/opti";
import { PreviewParams } from "@optimizely/cms-sdk";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { searchParams }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const previewParams = (await searchParams) as PreviewParams;
  const language = previewParams?.loc;
  if (!language) {
    return {};
  }
  const siteSettings = await cached.getSiteSettings(language);
  return {
    icons: siteSettings?.favicon?.url.default,
  };
}
