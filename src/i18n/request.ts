import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export const fallbackFileName = "fallback.json";
export const normalizedFileName = "normalized.json";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const fallbackMessages = (await import(`../../messages/${fallbackFileName}`))
    .default;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const combinedMessages = { ...fallbackMessages, ...messages };

  return {
    locale,
    messages: normalizeMessages(combinedMessages),
  };
});

/**
 * Normalizes the messages by replacing {} with {value}
 * @param messages - The messages to normalize
 * @returns The normalized messages
 */
export function normalizeMessages(messages: Record<string, string>) {
  Object.keys(messages).forEach((key) => {
    if (key.includes("{}")) {
      // We can't have an empty replace token, so we replace it with {value}
      const newKey = key.replaceAll("{}", "{value}");
      messages[newKey] = newKey;
      // Remove the original key
      delete messages[key];
    }
  });
  return deepen(messages);
}

/**
 * The opposite of flattening an object, it takes an object with dot-separated keys and deepens it into a nested object.
 * This is required because the Next.js internationalization system expects a nested object structure.
 *
 * @param obj - The object to deepen
 * @returns The deepened object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepen(obj: Record<string, any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};

  // For each object path (property key) in the object
  for (const objectPath in obj) {
    // Split path into component parts
    const parts = objectPath.split(".");

    // Create sub-objects along path as needed
    let target = result;
    while (parts.length > 1) {
      const part = parts.shift();
      if (!part) continue;
      // If object part hasn't been created, create it
      if (!target[part]) {
        target[part] = {};
      }
      // Move to the next part of the path
      target = target[part];
    }

    // Set value at end of path
    target[parts[0]] = obj[objectPath];
  }

  return result;
}
