import "@/lib/opti/opti-init";
import { getClient } from "@optimizely/cms-sdk";
import {
  getContext,
  OptimizelyComponent,
  withAppContext,
} from "@optimizely/cms-sdk/react/server";
import Script from "next/script";
import { NextPreviewComponent } from "@optimizely/cms-sdk/react/nextjs";
import { PreviewParams } from "@optimizely/cms-sdk";
import { OptimizelyContentProps } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { RootLayout } from "../RootLayout";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/constants/locales";
import { populateSiteSettings } from "@/lib/data/site-settings";
import { OptiContextProvider } from "@/components/ui/context/OptiContext";
export { generateMetadata } from "./metadata";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function Page({ searchParams }: Props) {
  const client = getClient();

  const previewParams = (await searchParams) as PreviewParams;
  if (!previewParams) {
    return <h1>No content found</h1>;
  }
  const response = (await client.getPreviewContent(
    previewParams,
  )) as OptimizelyContentProps;

  let locale = previewParams.loc;
  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    locale = DEFAULT_LOCALE;
  }
  const metadata = response._metadata as
    { url?: { hierarchical?: string } } | undefined;
  await populateSiteSettings(metadata?.url?.hierarchical ?? "", locale);

  const contextData = getContext();
  if (!contextData) {
    throw new Error("Context Data missing");
  }

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
      <OptiContextProvider contextData={contextData}>
        <OptimizelyComponent content={response} />
      </OptiContextProvider>
    </RootLayout>
  );
}

export default withAppContext(Page);
