import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import {
  genericExperienceConfig,
} from "../GenericExperience/GenericExperience.model";

export const HomeExperienceType = contentType({
  ...genericExperienceConfig,
  key: `${KEY_PREFIX}HomeExperience_Experience`,
  displayName: `${DISPLAY_NAME_PREFIX}Home Experience`,
});
