import { setContextData } from "@optimizely/cms-sdk/react/server";
// export { generateMetadata } from "./[[...slug]]/metadata";
import { RootLayout } from "@/app/RootLayout";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/constants/locales";
import { Metadata } from "next";

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

  setContextData("locale", locale);
  return <RootLayout locale={language}>{children}</RootLayout>;
}

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // Get language from slug, don't use shift() as it will modify the original array
  let language = locale;
  if (!language || !SUPPORTED_LOCALES.includes(language)) {
    language = DEFAULT_LOCALE;
  }

  const root = language.startsWith("zh") ? "TI.com.cn" : "TI.com";
  return {
    title: {
      template: `%s | ${root}`,
      default: root,
    },
  };
}
