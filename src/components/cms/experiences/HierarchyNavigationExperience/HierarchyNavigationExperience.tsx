import { ContentProps } from "@optimizely/cms-sdk";
import { HierarchyNavigationExperiencePageType } from "./HierarchyNavigationExperience.model";
import { SiteFrame } from "@/components/global/SiteFrame/SiteFrame";
import { CommonPageHero } from "@/components/global/CommonPageHero";
import { populatePageData } from "@/lib/data/site-settings";
import { OptimizelyComposition } from "@optimizely/cms-sdk/react/server";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { ReusableColumnGrid } from "../../components/ColumnGrid/ReusableColumnGrid";
import { cached } from "@/lib/data/opti";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";

type Props = {
  content: ContentProps<typeof HierarchyNavigationExperiencePageType>;
};

export async function HierarchyNavigationExperiencePage({ content }: Props) {
  await populatePageData(content);

  const nav = normalizeGenericContentToTyped(
    await cached.getReferencedContent(content.hierarchyNav),
  );

  return (
    <SiteFrame content={content}>
      <CommonPageHero content={content} />

      <ReusableColumnGrid
        columnOptions="25-75"
        columns={[
          {
            content: <ExtendedOptimizelyComponent content={nav} />,
          },
          {
            content: (
              <OptimizelyComposition nodes={content.composition.nodes ?? []} />
            ),
          },
        ]}
      />
    </SiteFrame>
  );
}
