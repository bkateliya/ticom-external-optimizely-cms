import clsx from "clsx";

import {
  ExtendedOptimizelyComponent,
  OptimizelyContentProps,
} from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { cached } from "@/lib/data/opti";

import { CodeEmbedComponentType } from "./CodeEmbed.model";

export async function CodeEmbedComponent({
  content,
}: OptiComponentProps<typeof CodeEmbedComponentType>) {
  if (!content?.codeFragment) {
    return null;
  }

  // codeFragment is a contentReference (a shared, reusable Code Fragment), so it
  // arrives as {url, item, key} — resolve it to the real content and let the
  // registered CodeFragmentComponent render its code.
  const fragment = (await cached.getReferencedContent(
    content.codeFragment,
  )) as OptimizelyContentProps | null;

  if (!fragment) {
    return null;
  }

  return (
    <div className={clsx(content.hideOnMobile && "max-md:hidden!")}>
      <ExtendedOptimizelyComponent content={fragment} />
    </div>
  );
}
