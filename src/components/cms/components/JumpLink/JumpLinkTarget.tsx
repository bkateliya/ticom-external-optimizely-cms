import { OptiComponentProps } from "@/lib/ts/component-props";
import { JumpLinkTargetComponentType } from "./JumpLinkTarget.model";

export function JumpLinkTargetComponent({
  content,
}: OptiComponentProps<typeof JumpLinkTargetComponentType>) {
  if (!content?.jumpLink) {
    return null;
  }

  const anchorAttrs: Record<string, string> = {
    "navbar-id": content.jumpLink,
    "navbar-name": content.jumpLinkText || content.jumpLink,
  };

  return <div id={content.jumpLink} className="h-0" {...anchorAttrs} />;
}