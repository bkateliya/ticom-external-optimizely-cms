import { TiFooter } from "@/components/ui/ti/TiFooter";
import { getContextLocale } from "@/lib/utils/server-utils";
export function MainFooter() {
    const locale = getContextLocale();
    return <TiFooter locale={locale} />
}