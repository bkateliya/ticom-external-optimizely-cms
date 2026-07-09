import "@/lib/opti/opti-init";
import { redirect, RedirectType } from "next/navigation";
import { cached } from "@/lib/data/opti";
import { SUPPORTED_LOCALES } from "@/constants/locales";

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
