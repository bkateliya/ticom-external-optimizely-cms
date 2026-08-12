import "@/lib/opti/opti-init";
import { redirect, RedirectType } from "next/navigation";
import { cached } from "@/lib/data/opti";
import { SUPPORTED_LOCALES } from "@/constants/locales";

// Skip trying to statically prerender this because it needs a live Graph client
export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await cached.getContentByPath(`/`);
  if (!content[0]) {
    redirect("/" + SUPPORTED_LOCALES[0], RedirectType.replace);
  }

  return (
    <div>
      <h1>Hello Home World</h1>
    </div>
  );
}
