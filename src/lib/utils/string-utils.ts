// Validate GUID format
export function isGuid(value: string | undefined) {
  if (!value) return false;
  const guidRegex =
    /^\{?[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}\}?$/;
  return guidRegex.test(value);
}

export function normalizeGuid(value: string | undefined) {
  if (value && isGuid(value)) {
    const strippedGuid = value.replace(/[\{\-\}]/g, "").toLowerCase();
    const formattedGuid = `${strippedGuid.slice(0, 8)}-${strippedGuid.slice(8, 12)}-${strippedGuid.slice(12, 16)}-${strippedGuid.slice(16, 20)}-${strippedGuid.slice(20, 32)}`;
    return formattedGuid;
  }
  return null;
}
/*
Replace tokens in the given text with respective values
*/
export interface ReplacementToken {
  key: string;
  value: string;
}

export function tokenReplace(
  text: string | undefined,
  tokens: ReplacementToken[] | undefined,
) {
  // Replace each tokens
  if (text && tokens && tokens.length > 0) {
    tokens?.forEach((token) => {
      text = text?.replace(token.key, token.value);
    });
  }
  return text || "";
}

/**
 * Capitalizes the first letter of a string
 * @param str The string to capitalize
 * @returns The string with its first letter capitalized
 * @example
 * capitalizeFirstLetter('hello') // returns 'Hello'
 * capitalizeFirstLetter('world') // returns 'World'
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Trim string to desired length and add elipses
 * @param str The string to truncate
 * @param length The desired length of the string
 * @returns The truncated string
 * @example
 * truncateString('Hello, world!', 5) // returns 'Hello...'
 */
export function truncateString(str: string, length: number) {
  if (str === null || str === "") return "";
  else str = str.toString();

  return str.length > length
    ? str.substring(0, length) + "..."
    : str.substring(0, length);
}

// Source - https://stackoverflow.com/a/57527468
// Posted by Kamil Kiełczewski, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-13, License - CC BY-SA 4.0

export function wildcardToRegExp(wildcard: string): RegExp {
  const escaped = wildcard.replace(/[.+^${}()|[\]\\]/g, "\\$&"); // regexp escape
  return new RegExp(
    `^${escaped.replace(/\*/g, ".*").replace(/\?/g, ".")}$`,
    "i",
  );
}
