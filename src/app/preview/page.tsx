import "@/lib/opti/opti-init";
import { getClient } from "@optimizely/cms-sdk";
import {
  OptimizelyComponent,
  withAppContext,
} from "@optimizely/cms-sdk/react/server";
import Script from "next/script";
import { NextPreviewComponent } from "@optimizely/cms-sdk/react/nextjs";
import { PreviewParams } from "@optimizely/cms-sdk";
import { OptimizelyContentProps } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { RootLayout } from "../RootLayout";
import { toAppLocale } from "@/constants/locales";
import { populateSiteSettings } from "@/lib/data/site-settings";
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

  // The CMS preview passes the content locale as a Graph Language Code
  // (e.g. "zh-Hans-CN"), not our URL slug ("zh-cn"). Comparing it against
  // SUPPORTED_LOCALES (slugs) always failed for Chinese, so preview fell back to
  // English chrome. Map it back to the app slug for RootLayout/SiteSettings.
  const locale = toAppLocale(previewParams.loc);

  const metadata = response._metadata as { url?: { hierarchical?: string } } | undefined;
  await populateSiteSettings(metadata?.url?.hierarchical ?? "", locale);

  return (
    <RootLayout locale={locale}>

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
