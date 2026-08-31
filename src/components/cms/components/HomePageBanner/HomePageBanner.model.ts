import { contentType } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  propertyGroupKeys,
} from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { HeadlineContract } from "../../contracts/component-contracts/headline.model";
import { LinkContract } from "../../contracts/element-contracts/link.model";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";
import { ImageElementType } from "../../elements/ImageElement/ImageElement.model";

export const HomePageBannerComponentType = contentType({
  key: AllComponentTypeKeyMap.HomePageBannerComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Home Page Banner`,
  baseType: "_component",
  extends: [HeadlineContract, LinkContract],
  properties: {
    // Override from contract
    headlineLevel: {
      type: "string",
      displayName: "Headline Size Override",
      description:
        "Override the visual size of the headline.  By default is is based on the heading level.  The heading level is automatically determined",
      format: "selectOne",
      enum: [
        {
          value: "AUTO",
          displayName: "Automatic",
        },
        {
          value: "1",
          displayName: "3XL (H1)",
        },
      ],
      displayMode: "hidden",
    },
    backgroundImage: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "Background Image",
      description: "Select a custom banner or textured background image",
      group: "Content",
      isLocalized: true,
      isRequired: true,
    },
    featuredImage: {
      type: "content",
      allowedTypes: [ImageElementType],
      displayName: "Featured Image",
      description: "Featured image is optional for textured backgrounds",
      group: "Content",
      isLocalized: true,
    },
    campaignAlias: {
      type: "string",
      displayName: "Campaign Alias",
      description:
        "Include only the first 7 parts of the campaign alias without the 8th part -countrycode ending.  e.g. sys-ind-ba-TPS6282x_thermalp18_doorbell-bhp-eerd-null",
      maxLength: 100,
      isRequired: true,
    },

    startDate: {
      type: "dateTime",
      displayName: "Start Date",
      description: "Component can be visible from this date",
      group: propertyGroupKeys.ComponentConfiguration,
      isLocalized: true,
      indexingType: "queryable",
    },
    endDate: {
      type: "dateTime",
      displayName: "End Date",
      description:
        "Component may be hidden after this date (Unless there aren't enough slides)",
      group: propertyGroupKeys.ComponentConfiguration,
      isLocalized: true,
      indexingType: "queryable",
    },
    expireDate: {
      type: "dateTime",
      displayName: "Expiration Date",
      description: "Component will be unavailable after this date",
      group: propertyGroupKeys.ComponentConfiguration,
      isLocalized: true,
      indexingType: "queryable",
    },
    showOnHomePage: {
      type: "boolean",
      displayName: "Show on homepage",
      description:
        "If checked, the banner will show in the carousel on the homepage for this language",
      group: propertyGroupKeys.ComponentConfiguration,
      isLocalized: true,
      indexingType: "queryable",
    },
  },
});

export const HomePageHeroBannerFolderType = contentType({
  key: AllComponentTypeKeyMap.HomePageBannerFolder,
  displayName: `${DISPLAY_NAME_PREFIX}HomePage HeroBanner Folder`,
  baseType: "_folder",
  properties: {},
  mayContainTypes: ["_self", HomePageBannerComponentType],
});
