import { ContentProps } from "@optimizely/cms-sdk";
import { FaqQuestionAnswerPageType } from "./FaqQuestionAnswer.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";

type Props = {
  content: ContentProps<typeof FaqQuestionAnswerPageType>;
};

export async function FaqQuestionAnswerPage({ content }: Props) {

  return (
    <SiteFrame>
      <CommonPageHero content={content} />
    </SiteFrame>
  );
}

