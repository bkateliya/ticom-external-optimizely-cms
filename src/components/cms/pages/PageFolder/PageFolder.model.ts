import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import { AllPageAndExperienceTypeKeys } from "@/components/cms/contracts/common";
import { PageContentContract } from "@/components/cms/contracts/page-contacts/page-content.model";

export const PageFolderType = contentType({
  key: PageTypeKeyMap.PageFolderTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Page Folder`,
  description: "Used as a folder rather than a page",
  baseType: "_page",
  extends: [PageContentContract],
  properties: {},
  mayContainTypes: AllPageAndExperienceTypeKeys,
});
