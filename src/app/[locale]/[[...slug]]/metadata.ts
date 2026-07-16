import { SUPPORTED_LOCALES } from "@/constants/locales";
import { cached } from "@/lib/data/opti";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  // const { locale, slug } = await params;
  console.log("metadata params", await params);
  // const siteSettings = await cached.getSiteSettings(language);
  // return {
  //   icons: siteSettings?.favicon?.url.default,
  // };
  return {}
}
