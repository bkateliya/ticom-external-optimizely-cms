import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/constants/locales';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: SUPPORTED_LOCALES,

    // Used when no locale matches
    defaultLocale: DEFAULT_LOCALE
});