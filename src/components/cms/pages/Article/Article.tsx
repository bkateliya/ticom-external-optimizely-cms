import { ContentProps } from "@optimizely/cms-sdk";
import { ArticlePageType } from "./Article.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";

type Props = {
  content: ContentProps<typeof ArticlePageType>;
};

export async function ArticlePage({ content }: Props) {

  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

