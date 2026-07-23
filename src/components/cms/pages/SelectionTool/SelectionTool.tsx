import { ContentProps } from "@optimizely/cms-sdk";
import { SelectionToolPageType } from "./SelectionTool.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { populatePageData } from "@/lib/data/site-settings";

type Props = {
  content: ContentProps<typeof SelectionToolPageType>;
};

export async function SelectionToolPage({ content }: Props) {
  await populatePageData(content);
  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

