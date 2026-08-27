import { ContentProps } from "@optimizely/cms-sdk";
import { ArticlePageType } from "./Article.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { populatePageData } from "@/lib/data/site-settings";
import { JumpLinkStickyBehaviorProvider } from "@/components/cms/components/JumpLink/JumpLinkStickyBehaviorContext";

type Props = {
  content: ContentProps<typeof ArticlePageType>;
};

export async function ArticlePage({ content }: Props) {
  await populatePageData(content);
  return (
    <JumpLinkStickyBehaviorProvider value="vertical">
      <SiteFrame content={content}>
        <CommonPageHero content={content} />
      </SiteFrame>
    </JumpLinkStickyBehaviorProvider>
  );
}

