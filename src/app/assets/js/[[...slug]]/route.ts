import { TICOM } from "@/components/ui/ti/TIScriptConstants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const {
    slug: [ticom, ...slug],
  } = await params;

  if (ticom !== "@ticom") {
    return NextResponse.json(
      { message: "Resource not found" },
      { status: 404 },
    );
  }
  const url = [TICOM, ...slug].join("/");

  if (!url) {
    return Response.error();
  }

  const response = await fetch(url);
  const body = await response.blob();
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: { ...response.headers },
  });
}
