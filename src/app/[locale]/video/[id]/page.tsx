import "@/lib/opti/opti-init";
import {
  withAppContext,
} from "@optimizely/cms-sdk/react/server";
import { redirect, RedirectType } from "next/navigation";
import { VideoPage } from "@/components/ui/ti/VideoPage/VideoPage";
import { SUPPORTED_LOCALES } from "@/constants/locales";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

async function Page({ params }: Props) {
  const { locale, id } = await params;

  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    redirect(`/${SUPPORTED_LOCALES[0]}/video/${id}`, RedirectType.replace);
  }

  return <VideoPage id={id} />;
}

export default withAppContext(Page);
