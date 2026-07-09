import { HeroComponent } from "@/components/cms/components/Hero/Hero";
import { ContentProps } from "@optimizely/cms-sdk";
// import { TextField } from "@/components/ui/cms/TextField";
import {
  // getContext,
  getPreviewUtils,
  withAppContext,
} from "@optimizely/cms-sdk/react/server";
import { ArticlePageType } from "./Article.model";
import { HeroComponentType } from "../../components/Hero/Hero.model";

type Props = {
  content: ContentProps<typeof ArticlePageType>;
};

async function ArticlePage({ content }: Props) {
  const { pa } = getPreviewUtils(content);

  // // Access preview token, locale, etc.
  // const locale = context?.locale ?? "en-US";
  // const isPreview = !!context?.previewToken;
  // context.

  // const contentRefId = content.ContentRefTest?.[0];

  // const client = getClient();

  // const { previewToken } = getContext() ?? {};

  // const contentRefComponent = contentRefId
  //   ? await client.getContent(contentRefId, {
  //       previewToken: previewToken,
  //     })
  //   : null;

  return (
    <main>
      {/* <TextField cmsContent={content} field="pageTitle" as="h1" /> */}

      <HeroComponent
        content={content.hero as ContentProps<typeof HeroComponentType>}
        parentField="hero"
      />
      {/* Content Area Test:
      {content.ContentAreaTest?.map((item, index) => (
        <OptimizelyComponent key={index} content={item} />
      ))}
      {/* {contentRefComponent && (
        <OptimizelyComponent content={contentRefComponent} />
      )} */}
    </main>
  );
}

export const Article = withAppContext(ArticlePage);
