import { RemotePattern } from "next/dist/shared/lib/image-config";

export const remotePatterns: RemotePattern[] = [
  {
    protocol: "https",
    hostname: "*.optimizely.com",
  },
  {
    protocol: "https",
    hostname: "horizontal-sandbox.bynder.com",
  },
  {
    protocol: "https",
    hostname: "placehold.co",
  },
];

export function isAllowedImageDomain(url: string): boolean {
  return remotePatterns.some((pattern) => url.startsWith(pattern.hostname));
}
