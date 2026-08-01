
import { ComponentRegistry } from "@/lib/ts/component-props";

import {
  ApiHeaderComponentType,
  ApiHeaderLevel1ComponentType,
  ApiHeaderLevel2ComponentType,
} from "./ApiHeader/ApiHeader.model";
import { MainHeader } from "./MainHeader/MainHeader";
import { MainHeaderComponentType } from "./MainHeader/MainHeader.model";
import { ApiHeader } from "./ApiHeader/ApiHeader";
import { MainFooter } from "./MainFooter/MainFooter";
import { MainFooterComponentType } from "./MainFooter/MainFooter.model";
import { CreativeShowcaseFooter } from "./CreativeShowcaseFooter/CreativeShowcaseFooter";
import { CreativeShowcaseFooterComponentType } from "./CreativeShowcaseFooter/CreativeShowcaseFooter.model";
import { DlpHeader } from "./DlpHeader/DlpHeader";
import { DlpHeaderComponentType } from "./DlpHeader/DlpHeader.model";
import { SiteSettingsDataType } from "./SiteSettings/SiteSettings.model";
import { NoPreviewComponent } from "@/components/ui/cms/NoPreviewComponent";

export const structuralComponentRegistry: ComponentRegistry = {
  [MainHeaderComponentType.key]: MainHeader,
  [MainFooterComponentType.key]: MainFooter,

  [ApiHeaderComponentType.key]: ApiHeader,
  [ApiHeaderLevel1ComponentType.key]: NoPreviewComponent,
  [ApiHeaderLevel2ComponentType.key]: NoPreviewComponent,

  [DlpHeaderComponentType.key]: DlpHeader,
  [CreativeShowcaseFooterComponentType.key]: CreativeShowcaseFooter,
  [SiteSettingsDataType.key]: NoPreviewComponent,
};
