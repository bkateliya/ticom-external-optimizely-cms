import "@/lib/opti/opti-init";
import {
  OptimizelyComponent,
  setContextData,
  withAppContext,
} from "@optimizely/cms-sdk/react/server";
import { redirect, RedirectType } from "next/navigation";
import { cached } from "@/lib/data/opti";
import { SUPPORTED_LOCALES } from "@/constants/locales";

type Props = {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
};

async function Page({ params }: Props) {
  const { locale, slug = [] } = await params;

  // Remove language from slug and add it to the final slug
  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    redirect("/" + SUPPORTED_LOCALES[0], RedirectType.replace);
  }

  // Add home to the slug
  const path = `/${locale}/home/${slug.join("/")}/`;

  const content = await cached.getContentByPath(path);

  const mainContent = content[0];

  if (!mainContent) {
    return <div>No content found</div>;
  }

  const breadcrumbPath = await cached.getPath(path);
  setContextData("breadcrumbPath", breadcrumbPath);

  return (
    <OptimizelyComponent content={mainContent} />
  );
}

export default withAppContext(Page);
