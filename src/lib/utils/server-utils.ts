import { DEFAULT_LOCALE } from "@/constants/locales";
import { getContextData } from "@optimizely/cms-sdk/react/server";

export function getContextLocale() {
    return getContextData('locale') || DEFAULT_LOCALE
}