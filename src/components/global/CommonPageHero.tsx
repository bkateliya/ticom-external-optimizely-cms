import { ContentProps } from "@optimizely/cms-sdk";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { PageContentContractContentType } from "../cms/contracts/page-contacts/page-content.model";

type Props = {
  content: ContentProps<PageContentContractContentType>;
};

export async function CommonPageHero({ content }: Props) {
  if (content.hero) {
    return (
      <ExtendedOptimizelyComponent content={content.hero} parentField="hero" />
    );
  }
}
