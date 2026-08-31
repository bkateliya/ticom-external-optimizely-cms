import { ContentProps } from "@optimizely/cms-sdk";
import { ArticlePageType } from "./Article.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { populatePageData } from "@/lib/data/site-settings";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import {
  ReusableColumn,
  ReusableColumnGrid,
} from "../../components/ColumnGrid/ReusableColumnGrid";
import { JumpNavVertical } from "@/components/ui/molecules/JumpNavVertical";
import { Main } from "@/components/global/Main/Main";
import { ArticleSchema } from "./ArticleSchema";

type Props = {
  content: ContentProps<typeof ArticlePageType>;
};

export async function ArticlePage({ content }: Props) {
  await populatePageData(content);

  const mainContent = [
    <CommonPageHero key="pageHeading" content={content} />,
    content.dateline && (
      <p key="dateline" className="text-body-sm font-semibold">
        {content.dateline}
      </p>
    ),
    <Main key="main" content={content} />,
  ];

  const columns: ReusableColumn[] = [{ content: mainContent }];
  if (content.showStickyNav) {
    columns.push({ content: <JumpNavVertical stickyBehavior="vertical" /> });
  }

  return (
    <SiteFrame content={content}>
      <ArticleSchema content={content} />
      {columns.length === 2 ? (
        <SectionWrapper noPaddingTop noPaddingBottom>
          <ReusableColumnGrid columnOptions="75-25" columns={columns} />
        </SectionWrapper>
      ) : (
        <SectionWrapper noPaddingTop noPaddingBottom narrow>
          {mainContent}
        </SectionWrapper>
      )}
    </SiteFrame>
  );
}

