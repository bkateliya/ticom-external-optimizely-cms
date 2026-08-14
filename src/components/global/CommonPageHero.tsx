import { ContentProps } from "@optimizely/cms-sdk";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { PageHeaderContract } from "../cms/contracts/page-contacts/page-hero.model";
import { ContractContentType } from "@/lib/ts/opti";
import { PageContentContract } from "../cms/contracts/page-contacts/page-content.model";
import { SectionWrapper } from "../ui/molecules/SectionWrapper/SectionWrapper";

type Props = {
    content: ContentProps<ContractContentType<[typeof PageHeaderContract, typeof PageContentContract]>>;
};

export async function CommonPageHero({ content }: Props) {
    if (content.hero) {
        return <ExtendedOptimizelyComponent
            content={content.hero}
            parentField="hero"
        />;
    } else {
        return <SectionWrapper>
            <h1>{content.pageTitle}</h1>
        </SectionWrapper>
    }
}

