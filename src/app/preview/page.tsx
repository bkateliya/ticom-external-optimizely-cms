import "@/lib/opti/opti-init";
import { getClient } from "@optimizely/cms-sdk";
import {
  OptimizelyComponent,
  setContextData,
  withAppContext,
} from "@optimizely/cms-sdk/react/server";
import Script from "next/script";
import { NextPreviewComponent } from "@optimizely/cms-sdk/react/nextjs";
import { PreviewParams } from "@optimizely/cms-sdk";
import { OptimizelyContentProps } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { cached } from "@/lib/data/opti";
import { RootLayout } from "../RootLayout";
import { SUPPORTED_LOCALES } from "@/constants/locales";
export { generateMetadata } from "./metadata";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function Page({ searchParams }: Props) {
  const client = getClient();

  const previewParams = (await searchParams) as PreviewParams;
  if (!previewParams) {
    return <h1>No content found</h1>
  }
  const response = (await client.getPreviewContent(
    previewParams,
  )) as OptimizelyContentProps;

  let language = previewParams.loc;
  if (!language || !SUPPORTED_LOCALES.includes(language)) {
    language = "en-US";
  }

  const siteSettings = await cached.getSiteSettings(language);
  setContextData("siteSettings", siteSettings);
  return (
    <RootLayout locale={language}>
      <Script
        src={
          new URL(
            "/util/javascript/communicationinjector.js",
            process.env.OPTIMIZELY_CMS_URL,
          ).href
        }
      ></Script>
      <NextPreviewComponent />
      <OptimizelyComponent content={response} />
    </RootLayout>
  );
}

export default withAppContext(Page);
