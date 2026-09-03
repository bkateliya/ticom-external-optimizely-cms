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
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { formatEyebrowDate } from "@/lib/utils/content-format-utils";
import { TaxonomyType } from "../../data/Taxonomy.model";
import { getLocale } from "next-intl/server";

type Props = {
  content: ContentProps<typeof ArticlePageType>;
};

export async function ArticlePage({ content }: Props) {
  await populatePageData(content);

  const locale = await getLocale();

  const category = normalizeGenericContentToTyped(
    content.category,
    TaxonomyType,
  );
  const eyebrowText = !content.hideEyebrow
    ? [
        formatEyebrowDate(content.datePublished, locale),
        category?.value?.trim(),
      ]
        .filter(Boolean)
        .join(" | ")
    : "";

  const mainContent = [
    <CommonPageHero key="pageHeading" content={content} />,
    eyebrowText && (
      <p key="eyebrow" className="text-label uppercase">
        {eyebrowText}
      </p>
    ),
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
