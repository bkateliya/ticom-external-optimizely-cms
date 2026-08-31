import { SERVER_ENV_VARS } from "../env/server-env";

export interface SecurableUrl {
  isSecure: boolean;
  originalUrl: string;
  updatedUrl: string;
}
export function isSecureLink(url: string | null | undefined) {
  return url?.includes("/developer-apis/") || false;
}
export function parseSecurableLink(url: string | null): SecurableUrl | null {
  if (!url) {
    return null;
  }
  try {
    const urlObj = new URL(url, SERVER_ENV_VARS.OPTIMIZELY_GRAPH_HOST);
    const isSecure = isSecureLink(urlObj.pathname);
    if (isSecure && !urlObj.pathname.startsWith("/swc")) {
      urlObj.pathname = "/swc" + urlObj.pathname;
    } else {
      urlObj.pathname = urlObj.pathname.replace(/^\/swc/, "");
    }
    return {
      isSecure,
      originalUrl: url,
      updatedUrl: urlObj.toString(),
    };
  } catch {
    return null;
  }
}
