import { contentType } from "@optimizely/cms-sdk";
import {
  KEY_PREFIX,
  DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { HomeExperienceType } from "../../experiences/HomeExperience/HomeExperience.model";
import { SiteSettingsDataType } from "../SiteSettings/SiteSettings.model";

export const SiteRootType = contentType({
  key: `${KEY_PREFIX}SiteRoot`,
  displayName: `${DISPLAY_NAME_PREFIX}Site Root`,
  baseType: "_page",
  mayContainTypes: [HomeExperienceType, SiteSettingsDataType],
});
