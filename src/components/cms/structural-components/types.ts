import {
  ApiHeaderComponentType,
  ApiHeaderLevel1ComponentType,
  ApiHeaderLevel2ComponentType,
} from "./ApiHeader/ApiHeader.model";

import { CreativeShowcaseFooterComponentType } from "./CreativeShowcaseFooter/CreativeShowcaseFooter.model";
import { DlpHeaderComponentType } from "./DlpHeader/DlpHeader.model";
import { MainFooterComponentType } from "./MainFooter/MainFooter.model";
import { MainHeaderComponentType } from "./MainHeader/MainHeader.model";
import { SiteSettingsDataType } from "./SiteSettings/SiteSettings.model";

export const structuralComponentTypes = [
  MainHeaderComponentType,
  MainFooterComponentType,
  ApiHeaderComponentType,
  ApiHeaderLevel1ComponentType,
  ApiHeaderLevel2ComponentType,
  DlpHeaderComponentType,
  CreativeShowcaseFooterComponentType,
  SiteSettingsDataType,
];