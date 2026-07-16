import { TiHeader } from "@/components/ui/ti/TiHeader";
import { getContextLocale } from "@/lib/utils/server-utils";

export function MainHeader() {
    const locale = getContextLocale() ;
    return <TiHeader locale={locale} />
}