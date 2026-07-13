import { PageContentContract, PageContentContractContentType } from "@/components/cms/contracts/page-contacts/page-content.model";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { cached } from "@/lib/data/opti";
import { ContentProps } from "@optimizely/cms-sdk";
import { getContextData } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";

export async function Breadcrumb() {

    const path = getContextData("breadcrumbPath") ?? [];
    const [_root, ...rest] = path;

    // If needed we can optimize this query later
    const items = await Promise.all(rest.map(x =>
        x._metadata && cached.getReferencedContent<ContentProps<PageContentContractContentType>>(
            { key: x._metadata.key, locale: x._metadata.locale, type: PageContentContract.key })));

    const t = await getTranslations();
    const breadcrumb = items.map((x, i) => ({
        title: i === 0 ? t('Home') : x?.navigationTitle || x?.pageTitle || '',
        url: x?._metadata.url.default || ''
    }))

    return <SectionWrapper>
        <ti-breadcrumb class="ti_p-breadcrumb u-show-only-on-desktop" data-lid="breadcrumb">
            {breadcrumb.map((item, index) =>
                <ti-breadcrumb-section data-lid={`breadcrumb_${index}-${item.title}`} label={item.title}
                    bid={index}
                    is-home={index === 0}>
                    <a slot="trigger"
                        data-navtitle={`breadcrumb_${index}-${item.title}`} id={`ti-breadcrumb-section-${index}`}
                        href={item.url}>{item.title}</a>
                </ti-breadcrumb-section>)}
        </ti-breadcrumb>
    </SectionWrapper>
}

