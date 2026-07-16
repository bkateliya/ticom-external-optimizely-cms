import { ContentProps } from "@optimizely/cms-sdk";
import { ApiDocumentationPageType } from "./ApiDocumentation.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";

type Props = {
  content: ContentProps<typeof ApiDocumentationPageType>;
};

export async function ApiDocumentationPage({ content }: Props) {

  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

