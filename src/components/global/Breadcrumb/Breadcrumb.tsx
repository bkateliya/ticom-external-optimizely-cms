import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { getContextData } from "@optimizely/cms-sdk/react/server";

export async function Breadcrumb() {

    const breadcrumb = getContextData("breadcrumb") ?? [];

    return <SectionWrapper>
        <ti-breadcrumb class="ti_p-breadcrumb u-show-only-on-desktop" data-lid="breadcrumb">
            {breadcrumb.map((item, index) => {
                return <ti-breadcrumb-section key={item.url} data-lid={`breadcrumb_${index}-${item.title}`} label={item.title}
                    bid={index}
                    is-home={index === 0}>
                    {
                        index === breadcrumb.length - 1 ? <span slot="trigger"
                            className="text-body-md/[28px]"
                            data-navtitle={`breadcrumb_${index}-${item.title}`} id={`ti-breadcrumb-section-${index}`}
                        >{item.title}</span> : <a slot="trigger"
                            data-navtitle={`breadcrumb_${index}-${item.title}`} id={`ti-breadcrumb-section-${index}`}
                            href={item.url}>{item.title}</a>
                    }
                </ti-breadcrumb-section>;
            })}
        </ti-breadcrumb>
    </SectionWrapper >
}

