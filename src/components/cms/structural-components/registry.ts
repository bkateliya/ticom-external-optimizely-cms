
import { ComponentRegistry } from "@/lib/ts/component-props";

import { ApiHeaderComponentType } from "./ApiHeader/ApiHeader.model";
import { MainHeader } from "./MainHeader/MainHeader";
import { MainHeaderComponentType } from "./MainHeader/MainHeader.model";
import { ApiHeader } from "./ApiHeader/ApiHeader";
import { MainFooter } from "./MainFooter/MainFooter";
import { MainFooterComponentType } from "./MainFooter/MainFooter.model";
import { DlpFooter } from "./DlpFooter/DlpFooter";
import { DlpFooterComponentType } from "./DlpFooter/DlpFooter.model";
import { DlpHeader } from "./DlpHeader/DlpHeader";
import { DlpHeaderComponentType } from "./DlpHeader/DlpHeader.model";
import { SiteSettingsDataType } from "./SiteSettings/SiteSettings.model";
import { NoPreviewComponent } from "@/components/ui/cms/NoPreviewComponent";

export const structuralComponentRegistry: ComponentRegistry = {
  [MainHeaderComponentType.key]: MainHeader,
  [MainFooterComponentType.key]: MainFooter,

  [ApiHeaderComponentType.key]: ApiHeader,

  [DlpHeaderComponentType.key]: DlpHeader,
  [DlpFooterComponentType.key]: DlpFooter,
  [SiteSettingsDataType.key]: NoPreviewComponent,
};
