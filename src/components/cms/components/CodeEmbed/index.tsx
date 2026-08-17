import clsx from "clsx";

import { OptiComponentProps } from "@/lib/ts/component-props";

import { CodeEmbedComponentType } from "./CodeEmbed.model";

export function CodeEmbedComponent({
  content,
}: OptiComponentProps<typeof CodeEmbedComponentType>) {
  if (!content) {
    return null;
  }

  const html = content.codeString?.replace(/\u00a0/g, " ") ?? "";

  if (!html.trim()) {
    return null;
  }

  return (
    <div
      className={clsx("code-embed", content.hideOnMobile && "max-md:hidden!")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
