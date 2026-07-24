import { PreviewParams } from "@optimizely/cms-sdk";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { searchParams }: Props,
): Promise<Metadata> {
  const previewParams = (await searchParams) as PreviewParams;
  const language = previewParams?.loc;
  if (!language) {
    return {};
  }
  // const siteSettings = await cached.getSiteSettings(language);
  return {
    // icons: siteSettings?.favicon?.url.default,
  };
}
