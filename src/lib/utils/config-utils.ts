import { parseUrlObject } from "./link-utils";
import { isAllowedImageDomain } from "../next-config/images";

export function isValidNextImageDomain(url: string): boolean {
  const hostname = parseUrlObject(url)?.origin;
  if (!hostname) {
    return true;
  }
  return isAllowedImageDomain(hostname);
}
