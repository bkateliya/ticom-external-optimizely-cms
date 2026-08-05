// import { CtaList } from "@/components/ui/molecules/CtaList/CtaList";
// import { DeprecatedCtaListComponentType } from "./cta-list.model";
import { ComponentRegistry } from "@/lib/ts/component-props";
import { HeadlineComponentType } from "./headline.model";
import { Headline } from "@/components/ui/molecules/Headline/Headline";

export const contractComponentRegistry: ComponentRegistry = {
  // [DeprecatedCtaListComponentType.key]: CtaList,
  [HeadlineComponentType.key]: Headline,
};
