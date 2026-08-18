import { getContextData } from "@optimizely/cms-sdk/react/server";

/**
 * Use this on server components only.
 * For client components use `useIsEditMode()`
 * @returns
 */
export function isEditMode() {
  return getContextData("mode") === "edit";
}
