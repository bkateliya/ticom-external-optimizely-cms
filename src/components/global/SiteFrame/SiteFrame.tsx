import {
    getContextData,
} from "@optimizely/cms-sdk/react/server";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { Breadcrumb } from "@/components/global/Breadcrumb/Breadcrumb";


export async function SiteFrame({ children }: React.PropsWithChildren) {

    const siteSettings = getContextData('siteSettings');

    return (
        <>
            {siteSettings?.header && (
                <ExtendedOptimizelyComponent
                    content={siteSettings.header}
                />
            )}
            <main>
                <Breadcrumb />
                {children}
            </main>
            {siteSettings?.footer && (
                <ExtendedOptimizelyComponent
                    content={siteSettings.footer}
                />
            )}
        </>
    );
}
