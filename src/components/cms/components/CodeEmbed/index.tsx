import { CodeEmbedComponentType } from "./CodeEmbed.model";

import { OptiComponentProps } from "@/lib/ts/component-props";

import { decode } from "html-entities";

type Props = OptiComponentProps<typeof CodeEmbedComponentType> & {};

type OptiNode = NonNullable<
  Required<Props>["content"]["code"]
>["json"]["children"][number];

export function CodeEmbedComponent({ content }: Props) {
  if (!content) {
    return null;
  }
  const rawHtml = content.codeString?.replace(/\u00a0/g, " ") || decode(RichTextToHtmlString(content.code?.json));
  return <div className="code-embed" dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

function RichTextToHtmlString(content: OptiNode | undefined): string | null {
  if (!content) {
    return null;
  }
  if ("text" in content) {
    return (content?.text as string | undefined)?.replaceAll("&nbsp;", " ") || "";
  }
  if ("children" in content) {
    return content.children.map(RichTextToHtmlString).join("") || "";
  } else {
    throw new Error("Invalid node type");
  }
}
