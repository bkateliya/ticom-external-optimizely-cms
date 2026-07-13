import { setContextData } from "@optimizely/cms-sdk/react/server";
import { cached } from "@/lib/data/opti";
export { generateMetadata } from "./metadata";
import { RootLayout } from '@/app/RootLayout'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/constants/locales";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>) {
  const { locale } = await params;

  // Get language from slug, don't use shift() as it will modify the original array
  let language = locale;
  if (!language || !SUPPORTED_LOCALES.includes(language)) {
    language = DEFAULT_LOCALE;
  }

  const siteSettings = await cached.getSiteSettings(language);
  setContextData("siteSettings", siteSettings);
  setContextData("locale", locale);
  return <RootLayout locale={language}>{children}</RootLayout>;
}
