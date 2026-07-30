import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { ApplicationComponentTypeKeyMap } from "../keys";

export const ApplicationListingComponentType = contentType({
  key: ApplicationComponentTypeKeyMap.ApplicationListing,
  displayName: `${DISPLAY_NAME_PREFIX}Application Listing`,
  baseType: "_component",
  properties: {
    // Automatic page driven data
  },
});
