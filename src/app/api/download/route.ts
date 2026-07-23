import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  //TODO add validation

  if (!url) {
    return Response.error();
  }
  return fetch(url);
}
