import { CtaList } from "@/components/ui/molecules/CtaList/CtaList";
import { CtaListComponentType } from "./cta-list.model";
import { ComponentRegistry } from "@/lib/ts/component-props";
import { HeadlineComponentType } from "./headline.model";
import { Headline } from "@/components/ui/molecules/Headline/Headline";

export const contractComponentRegistry: ComponentRegistry = {
  [CtaListComponentType.key]: CtaList,
  [HeadlineComponentType.key]: Headline,
};
