import { buildConfig } from "@optimizely/cms-sdk";
import { propertyGroupKeys } from "./src/components/cms/constants.mjs";

export default buildConfig({
  components: ["./src/components/**/model.ts","./src/components/**/*.model.ts"],

  propertyGroups: [
    {
      key: propertyGroupKeys.Seo,
      displayName: "SEO",
    },
    {
      key: propertyGroupKeys.Layout,
      displayName: `Layout`,
      sortOrder: 13,
    },
    {
      key: propertyGroupKeys.ComponentConfiguration,
      displayName: `Component Configuration`,
      sortOrder: 12,
    },
    {
      key: propertyGroupKeys.Appearance,
      displayName: `Style Options`,
      sortOrder: 15,
    },
    {
      key: propertyGroupKeys.Data,
      displayName: "Data",
      sortOrder: 11,
    },
    {
      key: propertyGroupKeys.Config,
      displayName: "Configuration",
      sortOrder: 18,
    },
    {
      key: propertyGroupKeys.DeletedFields,
      displayName: "Deleted Fields",
      sortOrder: 999,
    }
  ],
  
  // content: [
  //   {
  //     key: "TI_Root",
  //     displayName: "Root",
  //     contentType: `${KEY_PREFIX}HomeExperience_Experience`
  //   }
  // ],
  // applications: [
  //   {
  //     type: "website",
  //     key: "TI_App",
  //     displayName: "TI.com",
  //     isDefault: true,
  //     entryPoint: "TI_Root",
  //     hosts: [
  //       {
  //         authority: 'localhost:3004',
  //         type: 'primary',
  //         preferredUrlScheme: 'https',
  //       },
  //     ],
  //   }
  // ],
});
