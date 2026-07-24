/**
 * Shim for the `window.com.TI.User` / `window.com.TI.UserPreferences` singletons.
 *
 * On ti.com these are provided by the authenticated page shell, which also
 * dispatches `tiUserPreferenceReady` once they're populated. The header web
 * components (`ti-header-language-selection`, the LLC ship-to/currency
 * sidesheet, …) read their initial language / ship-to / currency straight from
 * these singletons in `componentWillLoad` — e.g.
 *
 *     this._initialUserShipToPreference = await UserPreferences.getUserShipToPreference();
 *     this._initialUserShipToPreference
 *       ? (this.locationState = getShipToItem(...), this._location = this.locationState)
 *       : this.locationState = undefined;   // ← no ship-to ⇒ locationState stays undefined
 *
 * A standalone embed doesn't load that shell, so the singletons are missing and
 * `getUserShipToPreference()` never returns a country. `locationState` /
 * `_location` stay undefined, and saving a language change then blows up on:
 *
 *     const n = this.locationState;  // undefined
 *     n.isCurrencyChanged = s;       // TypeError: Cannot set properties of undefined
 *
 * Providing the singletons up front (with an anonymous default ship-to so
 * `locationState` is always defined) keeps the header's init happy and stops
 * the crash. Seeding runs only when the singletons are absent, so a real page
 * shell — if ever present — is left untouched.
 */

// The subset of the TI singleton interface the header bundles actually touch
// (gathered from header-components + header-responsive.js).
interface TiUserPreferences {
  INFO_FIELDS: { language: string; shipTo: string; currency: string; noTransMsg: string };
  isUserPreferenceReady: () => boolean;
  getUserHasChangedDomain: () => boolean;
  getUserLanguagePreference: () => Promise<string>;
  getUserShipToPreference: () => Promise<string>;
  getUserCurrencyPreference: () => Promise<string>;
  getUserNoTransMsgPreference: () => Promise<boolean>;
  getUserPreference: (field: string) => Promise<string>;
  setUserPreference: (field: string, value: string) => Promise<string>;
}

interface TiUser {
  LANGUAGE_STRINGS: Record<string, unknown>;
  getLoginStatus: (context?: string) => Promise<boolean>;
  getGreetingMessage: () => Promise<string>;
}

interface TiGlobal {
  TI?: { User?: TiUser; UserPreferences?: TiUserPreferences;[key: string]: unknown };
}

/** Map an app locale slug (e.g. "en-us") to the TI header's locale form ("en-US"). */
function toTiLocale(slug: string): string {
  if (!slug) return "en-US";
  const [lang, region] = slug.split("-");
  return region ? `${lang}-${region.toUpperCase()}` : lang;
}

export function ensureTiGlobals(locale: string): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as { com?: TiGlobal };
  w.com = w.com ?? {};
  w.com.TI = w.com.TI ?? {};
  const TI = w.com.TI;

  // In-memory preference store seeded with sane anonymous defaults. ship-to /
  // currency default to US / USD so the header's location & currency state are
  // never undefined (an empty ship-to is what crashes `_saveLllcData`).
  const prefs: Record<string, string> = {
    language: toTiLocale(locale),
    shipTo: "US",
    currency: "USD",
  };

  if (!TI.UserPreferences) {
    TI.UserPreferences = {
      INFO_FIELDS: {
        language: "language",
        shipTo: "shipTo",
        currency: "currency",
        noTransMsg: "noTransMsg",
      },
      isUserPreferenceReady: () => true,
      getUserHasChangedDomain: () => false,
      getUserLanguagePreference: () => Promise.resolve(prefs.language),
      getUserShipToPreference: () => Promise.resolve(prefs.shipTo),
      getUserCurrencyPreference: () => Promise.resolve(prefs.currency),
      getUserNoTransMsgPreference: () => Promise.resolve(false),
      getUserPreference: (field: string) => Promise.resolve(prefs[field] ?? ""),
      setUserPreference: (field: string, value: string) => {
        prefs[field] = value;
        return Promise.resolve(value);
      },
    };
  }

  if (!TI.User) {
    TI.User = {
      LANGUAGE_STRINGS: {},
      getLoginStatus: () => Promise.resolve(false),
      getGreetingMessage: () => Promise.resolve(""),
    };
  }
}
