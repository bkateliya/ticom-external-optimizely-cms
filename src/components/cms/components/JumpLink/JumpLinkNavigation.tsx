import { OptiComponentProps } from "@/lib/ts/component-props";
import { JumpLinkNavigationComponentType } from "./JumpLinkNavigation.model";
import { JumpNavVertical } from "@/components/ui/molecules/JumpNavVertical";

export function JumpLinkNavigationComponent({}: OptiComponentProps<
  typeof JumpLinkNavigationComponentType
>) {
  return <JumpNavVertical stickyBehavior="horizontal" />;
}
