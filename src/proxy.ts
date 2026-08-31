import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import { NextRequest, NextResponse } from "next/server";
import { SERVER_ENV_VARS } from "./lib/env/server-env";

const nextIntlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/assets/js/@ticom")) {
    return await rewriteTiComPath(request.nextUrl.pathname);
    // return NextResponse.rewrite(rewriteUrl);
  }
  if (request.nextUrl.pathname.match(/^\/..-..\/?.*/)) {
    return nextIntlMiddleware(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match urls that start with a locale
    `/(..-../?.*)`,
    "/assets/js/@ticom/:path*",
  ],
};

async function rewriteTiComPath(pathname: string) {
  // We can't use a normal rewrite because the proxy gives an SSL error
  const rewriteUrl = new URL(
    `${SERVER_ENV_VARS.TICOM_BASE_DOMAIN}${pathname}`,
  );

  const response = await fetch(rewriteUrl);
  const body = await response.blob();
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: { ...response.headers },
  });
}
