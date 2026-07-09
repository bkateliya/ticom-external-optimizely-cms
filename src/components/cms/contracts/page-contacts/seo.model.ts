import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";

export const SEOContract = contract({
  key: `${KEY_PREFIX}SEO_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}SEO Contract`,
  properties: {
    metaTitle: {
      type: "string",
      displayName: "Meta Title",
      description: "SEO title for search engines",
      maxLength: 60,
      group: PropertyTypes.Seo,
      isLocalized: true,
    },
    metaDescription: {
      type: "string",
      displayName: "Meta Description",
      description: "SEO description for search engines",
      maxLength: 160,
      group: PropertyTypes.Seo,
      isLocalized: true,
    },
    ogImage: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "Open Graph Image",
      description: "Image for social media sharing",
      group: PropertyTypes.Seo,
      isLocalized: true,
    },
  },
});
