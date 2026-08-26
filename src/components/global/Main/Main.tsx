import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { MainContractContentType } from "@/components/cms/contracts/page-contacts/main.model";
import { OptionalOptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";
import { getExpandedContractTypes } from "@/lib/opti/opti-init-utils";

// Main-only components (extend AllowIn.Main but not AllowIn.Section) assume no ambient container, so skip SectionWrapper.
function getFullBleedTypeKeys(): Set<string> {
  const sectionKeys = new Set(
    getExpandedContractTypes(AllowIn.Section).map((t) => t.key),
  );
  return new Set(
    getExpandedContractTypes(AllowIn.Main)
      .map((t) => t.key)
      .filter((key) => !sectionKeys.has(key)),
  );
}

export function Main({
  content,
}: OptionalOptiComponentProps<MainContractContentType>) {
  if (!content?.main?.length) {
    return null;
  }

  const fullBleedTypeKeys = getFullBleedTypeKeys();

  const groups: { fullBleed: boolean; items: typeof content.main }[] = [];
  for (const item of content.main) {
    const fullBleed = fullBleedTypeKeys.has(item.__typename);
    const lastGroup = groups[groups.length - 1];
    if (lastGroup?.fullBleed === fullBleed) {
      lastGroup.items.push(item);
    } else {
      groups.push({ fullBleed, items: [item] });
    }
  }

  return (
    <>
      {groups.map((group, gi) =>
        group.fullBleed ? (
          group.items.map((item, i) => (
            <ExtendedOptimizelyComponent
              key={`${gi}-${i}`}
              content={item}
              parentField="main"
            />
          ))
        ) : (
          <SectionWrapper key={gi}>
            {group.items.map((item, i) => (
              <ExtendedOptimizelyComponent
                key={i}
                content={item}
                parentField="main"
              />
            ))}
          </SectionWrapper>
        ),
      )}
    </>
  );
}
