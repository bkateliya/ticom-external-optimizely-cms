import { KEY_PREFIX } from "@/components/cms/constants.mjs";

// This is in separate file to avoid circular reference when pushing types
// Otherwise there's a confusing error about object is not iterable when doing an Opti push

export const ApplicationComponentTypeKeyMap = {
  ApplicationListing: `${KEY_PREFIX}ApplicationListing_Component`,
};
